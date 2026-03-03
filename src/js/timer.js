import { state, getPlan } from './state.js';

let _timer    = null;
let _remaining = 0;
let _total     = 0;
let _audioCtx  = null; // created on user gesture so iOS/Android allow it

// Must be called from a user-gesture context (button click)
function _initAudio() {
  try {
    _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (_audioCtx.state === 'suspended') _audioCtx.resume();
  } catch (e) { _audioCtx = null; }
}

function _beep() {
  if (!_audioCtx) return;
  try {
    const t = _audioCtx.currentTime;
    // Two short tones: ding-ding
    [0, 0.25].forEach(offset => {
      const osc  = _audioCtx.createOscillator();
      const gain = _audioCtx.createGain();
      osc.connect(gain);
      gain.connect(_audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.5, t + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.35);
      osc.start(t + offset);
      osc.stop(t + offset + 0.35);
    });
  } catch (e) {}
}

function _parseRestStr(restStr) {
  if (!restStr) return 90;
  // "90 seg", "60 seg", "45 seg", …
  const seg = restStr.match(/(\d+)\s*seg/i);
  if (seg) return parseInt(seg[1]);
  // "2 min", "3 min"
  const min = restStr.match(/(\d+)\s*min/i);
  if (min) return parseInt(min[1]) * 60;
  return 90;
}

function _fmt(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, '0')}`;
}

function _el() { return document.getElementById('restTimer'); }

function _updateDisplay() {
  const timeEl = document.getElementById('rtTime');
  if (timeEl) timeEl.textContent = _fmt(_remaining);

  const fill = document.getElementById('rtRingFill');
  if (fill) {
    const circ = 2 * Math.PI * 20;
    const progress = _total > 0 ? _remaining / _total : 0;
    fill.style.strokeDashoffset = `${circ * (1 - progress)}`;
  }

  const el = _el();
  if (el) el.classList.toggle('rt-low', _remaining > 0 && _remaining <= 10);
}

function _onFinish() {
  _beep();
  try { if (navigator.vibrate) navigator.vibrate([150, 80, 150, 80, 300]); } catch (e) {}
  const timeEl = document.getElementById('rtTime');
  if (timeEl) timeEl.textContent = '¡Ya!';
  const el = _el();
  if (el) { el.classList.remove('rt-low'); el.classList.add('rt-done'); }
  setTimeout(() => { const e = _el(); if (e) e.style.display = 'none'; }, 2500);
}

export function startRestTimer(exId) {
  clearInterval(_timer);
  _initAudio(); // called here = inside button-click handler = valid user gesture

  // Look up the exercise rest time from the current session plan
  let restStr = '90 seg';
  const session = getPlan().find(s => s.id === state.currentId);
  if (session) {
    for (const bl of session.workout.blocks) {
      const ex = bl.exercises.find(e => e.id === exId);
      if (ex && ex.rest) { restStr = ex.rest; break; }
    }
  }

  _total     = _parseRestStr(restStr);
  _remaining = _total;

  let el = _el();
  if (!el) {
    el = document.createElement('div');
    el.id = 'restTimer';
    document.body.appendChild(el);
  }

  const circ = 2 * Math.PI * 20;
  el.className = 'rest-timer';
  el.style.display = 'flex';
  el.innerHTML = `
    <div class="rt-inner">
      <div class="rt-label">DESCANSO</div>
      <div class="rt-ring-wrap">
        <svg class="rt-ring" viewBox="0 0 48 48">
          <circle class="rt-ring-bg" cx="24" cy="24" r="20"/>
          <circle class="rt-ring-fill" id="rtRingFill" cx="24" cy="24" r="20"
            style="stroke-dasharray:${circ};stroke-dashoffset:0"/>
        </svg>
        <div class="rt-time" id="rtTime">${_fmt(_remaining)}</div>
      </div>
      <div class="rt-controls">
        <button class="rt-btn" onclick="window._rtAdjust(-30)">−30</button>
        <button class="rt-btn" onclick="window._rtAdjust(30)">+30</button>
        <button class="rt-btn-skip" onclick="window._rtSkip()"><i class="ti ti-x"></i></button>
      </div>
    </div>
  `;

  _timer = setInterval(() => {
    _remaining--;
    if (_remaining <= 0) {
      _remaining = 0;
      _updateDisplay();
      clearInterval(_timer);
      _onFinish();
    } else {
      _updateDisplay();
    }
  }, 1000);
}

export function stopRestTimer() {
  clearInterval(_timer);
  const el = _el();
  if (el) el.style.display = 'none';
}

window._rtSkip   = () => stopRestTimer();
window._rtAdjust = (delta) => {
  _remaining = Math.max(5, _remaining + delta);
  if (_remaining > _total) _total = _remaining;
  _updateDisplay();
};

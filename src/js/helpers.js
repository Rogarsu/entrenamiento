export function escStr(str) {
  return (str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

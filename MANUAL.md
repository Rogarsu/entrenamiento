# Manual de Usuario — SistemaVida · Entrenamiento Físico

> Versión actualizada · Última revisión: marzo 2026

---

## Índice

1. [Primeros pasos — Registro e inicio de sesión](#1-primeros-pasos)
2. [Onboarding — Crear tu plan personalizado](#2-onboarding)
3. [Pantalla principal — Vista de sesión](#3-pantalla-principal)
4. [Cómo entrenar — Flujo completo de una sesión](#4-cómo-entrenar)
5. [Modal de ejercicio — Registrar pesos y reps](#5-modal-de-ejercicio)
6. [Sistema de progresión inteligente](#6-sistema-de-progresión)
7. [Historial de entrenamientos](#7-historial)
8. [Nutrición](#8-nutrición)
9. [Progreso físico](#9-progreso)
10. [Bienestar — Chequeo de dolores musculares](#10-bienestar)
11. [Reportes en PDF](#11-reportes)
12. [Gestión del plan — Nuevo ciclo y reinicio](#12-gestión-del-plan)
13. [Navegación y accesos directos](#13-navegación)
14. [Datos y sincronización](#14-datos-y-sincronización)
15. [Lógica interna del sistema (referencia técnica)](#15-lógica-interna)

---

## 1. Primeros pasos

### Registro de cuenta

Al abrir la app por primera vez verás la pantalla de autenticación.

**Crear cuenta nueva:**
1. Toca la pestaña **"Registrarse"**
2. Ingresa tu email
3. Crea una contraseña (mínimo 6 caracteres)
4. Repite la contraseña
5. Toca **"Crear cuenta"**
6. Revisa tu email para confirmar la cuenta

**Iniciar sesión con email:**
1. Ingresa tu email y contraseña
2. Toca **"Entrar"**

**Iniciar sesión con Google:**
1. Toca **"Acceder con Google"**
2. Selecciona tu cuenta de Google en el popup

**Cerrar sesión:**
- Menú de navegación (esquina superior derecha) → **"Cerrar sesión"**

---

## 2. Onboarding

Al crear tu cuenta por primera vez, la app te guiará por **7 preguntas** para construir un plan de entrenamiento completamente personalizado basado en evidencia científica.

### Paso 1 — Objetivo *(multi-selección)*
Elige uno o varios objetivos. El plan combinará estrategias si seleccionas más de uno.

| Opción | Descripción | Rangos de rep |
|--------|-------------|---------------|
| Ganar fuerza | Cargas altas, pocas repeticiones | 3–8 reps |
| Ganar músculo | Volumen e hipertrofia | 6–15 reps |
| Perder peso | Circuitos metabólicos | 12–20 reps |
| Mejorar resistencia | Alta resistencia | 15–25 reps |
| Condición general | Equilibrio completo | 8–15 reps |

### Paso 2 — Nivel de experiencia
| Opción | Criterio |
|--------|----------|
| Principiante | Menos de 1 año entrenando |
| Intermedio | 1–3 años de experiencia |
| Avanzado | Más de 3 años, técnica sólida |

### Paso 3 — Días disponibles por semana
Opciones: 1, 2, 3, 4, 5 o 6 días.

> **Nota:** El número de días determina directamente el total de sesiones del plan (`días × semanas = total de sesiones`).

### Paso 4 — Duración por sesión
| Opción | Ejercicios por sesión |
|--------|----------------------|
| 45 minutos | 4 ejercicios |
| 60 minutos | 5 ejercicios |
| 75 minutos | 6 ejercicios |
| 90 minutos | 7 ejercicios |

### Paso 5 — Entorno de entrenamiento
| Opción | Equipamiento disponible |
|--------|------------------------|
| Sin equipamiento | Solo peso corporal |
| Casa con equipo | Mancuernas, bandas, banco |
| Gimnasio | Acceso completo a máquinas y barras |

### Paso 6 — División de entrenamiento
| División | Descripción | Tipos de sesión |
|----------|-------------|-----------------|
| Full Body | Todo el cuerpo en cada sesión | 3 tipos (A, B, C) |
| Solo Tren Superior | Pecho, espalda, hombros, brazos | 2 tipos |
| Solo Tren Inferior | Piernas, glúteo, core | 2 tipos |
| Superior + Inferior | Alternancia tren superior/inferior | 4 tipos |
| Push / Pull / Legs | Empuje, jalón y piernas | 6 tipos |

> **Aviso de ciclos (⚠️ color ámbar):** Si eliges más días que tipos de sesión disponibles (ej. 6 días con Full Body que tiene 3 tipos), la app muestra un aviso explicando:
> - Cuántos días por semana ciclarán de vuelta al inicio
> - Que los tipos de sesión se repiten en orden (A → B → C → A…)
> - Que cada vuelta usa **ejercicios distintos** para el mismo grupo muscular
> - Que Push / Pull / Legs (6 tipos) es la opción sin ciclos para 6 días
>
> | División | Tipos | Aviso aparece con... |
> |----------|-------|---------------------|
> | Full Body | 3 | 4, 5 o 6 días |
> | Tren Superior | 2 | 3+ días |
> | Tren Inferior | 2 | 3+ días |
> | Superior + Inferior | 4 | 5 o 6 días |
> | Push / Pull / Legs | 6 | Nunca (hasta 6 días) |

### Paso 7 — Duración del plan
| Opción | Estructura de fases |
|--------|---------------------|
| 4 semanas | 2 fases |
| 8 semanas | 3 fases |
| 12 semanas | 4 fases (incluyendo semana de deload) |

> **Vista previa de sesiones:** En este último paso verás un resumen: `X días/semana × Y semanas = Z sesiones en total`.

### Finalizar onboarding
Toca **"✓ Generar mi plan"** — la app calculará y guardará tu plan completo en segundos.

---

## 3. Pantalla principal

### Barra lateral (Sidebar)
- Muestra el progreso total: **"X / Y sesiones completadas"**
- Organizada por fases (Fase 1, 2, 3, 4)
- Cada fase es **desplegable/colapsable** al tocar su encabezado
- Cada sesión muestra: número, nombre y ✓ si está completada
- Toca cualquier sesión para cargarla en la vista principal

### Fila de estadísticas
Debajo de la barra de navegación, 4 tarjetas resumen:
- **Sesiones completadas** — número total de sesiones marcadas
- **Progreso total** — porcentaje del plan completado
- **Minutos entrenados** — suma de todos los tiempos de sesión
- **Energía media /10** — promedio de tus reportes de energía

---

## 4. Cómo entrenar — Flujo completo

### 1. Selecciona la sesión
Toca la sesión del día en la barra lateral.

### 2. Revisa los tabs de la sesión
La vista de sesión tiene 3 pestañas:

**Pre-Entreno:**
- Hidratación recomendada
- Calentamiento dinámico (5 ejercicios de movilidad)
- Activación articular específica
- Enfoque mental

**Entreno:**
- Tabla de ejercicios organizada por bloques musculares
- Cada ejercicio muestra: Series · Reps · Descanso · Guía de peso · Notas técnicas

**Post-Entreno:**
- Enfriamiento (5–8 min)
- Estiramientos de recuperación
- Nutrición post-entrenamiento
- Pautas de recuperación

### 3. Inicia el cronómetro
Toca **"Iniciar sesión"** para comenzar a registrar el tiempo. La app guardará la hora de inicio automáticamente.

### 4. Elige cómo registrar tus ejercicios

**Opción A — Modo guiado (recomendado):**
Toca el botón **"▶ Modo guiado"** en la parte superior del tab Entreno.
- Elige el bloque desde el que quieres empezar
- Si ya tienes datos de esta sesión, puedes **Retomar** o **Empezar de nuevo**
- Pantalla completa: una imagen grande + inputs de kg/reps serie a serie
- Timer de descanso inline entre series
- Al completar todas las series → botón "→ Siguiente ejercicio"
- Al final → pantalla de resumen con todos los sets registrados

**Opción B — Modal individual:**
Para cada ejercicio:
1. Toca la fila del ejercicio → se abre el **Modal de ejercicio**
2. El modal te guía **serie a serie**: ingresa kg y reps, toca "Completar serie", descansa con el timer, repite
3. En la última serie toca **"Completar y guardar"** — todo se guarda en un paso
4. El modal mostrará la recomendación para la próxima sesión
5. Un timer flotante arranca para el descanso entre ejercicios

### 5. Finaliza la sesión
1. Toca **"🚩 Sesión finalizada"**
2. Completa el formulario:
   - **Duración** — se auto-rellena desde el cronómetro
   - **Energía (1–10)** — cómo te sentiste de energético
   - **Fatiga (1–10)** — nivel de agotamiento al terminar
   - **Dolor o molestia** — describe si algo molestó
   - **Notas libres** — observaciones generales
   - **Peso corporal (opcional)** — se guarda en tu historial de peso
3. Toca **"💾 Guardar"**

La sesión quedará marcada con ✓ en la barra lateral.

---

## 5. Modal de ejercicio

Se abre al tocar cualquier ejercicio en la tabla de entrenamiento.

### Secciones del modal

**Imagen del ejercicio**
- Foto real o placeholder si no hay imagen disponible

**Información**
- Nombre del ejercicio
- Grupo muscular principal
- Equipamiento requerido

**Registro por series — flujo nuevo (modo serie a serie)**

Cuando abres un ejercicio por primera vez en la sesión, el modal guía cada serie individualmente:

1. Aparece **"Serie 1 de N · objetivo de reps"** con dos campos: **kg** y **reps**
2. Toca **"✓ Completar serie →"** para registrar la serie
3. Arranca un **timer de descanso inline** (dentro del modal) con cuenta regresiva circular
   - El tiempo de descanso viene del plan (p. ej. "90 seg", "90-120 seg", "2 min")
   - Botones **−30** / **+30** para ajustar el tiempo en cualquier momento
   - Botón **Saltar** para pasar directamente a la siguiente serie sin esperar
   - Al terminar el timer, suena una vibración y aparece el input de la siguiente serie
4. Se repite para cada serie mostrando las series ya completadas arriba (en gris)
5. En la última serie el botón dice **"✓ Completar y guardar"** — guarda todo en una sola operación

**Modo edición (si ya hay un registro guardado)**
Si el ejercicio ya tiene datos en la sesión actual, el modal muestra todas las series a la vez con sus valores guardados. Puedes modificar cualquier campo y tocar **"💾 Guardar cambios"**.

**Timer entre ejercicios (flotante)**
Después de guardar el último set (o en modo edición tras guardar), aparece un timer flotante de descanso entre ejercicios. Funciona igual que el timer inline pero superpuesto sobre la pantalla de sesión.

**Cambiar ejercicio**
- Botón **"🔄 Cambiar ejercicio"** — abre un selector con alternativas del mismo grupo muscular
- Botón **"↶ Volver al original"** — restaura el ejercicio planificado
- Los cambios se guardan para esa sesión específica

**Recomendación para próxima sesión**
Aparece automáticamente en la parte inferior del modal. Ver sección [Sistema de progresión](#6-sistema-de-progresión).

---

## 6. Sistema de progresión inteligente

La app calcula automáticamente cuánto peso usar en la próxima sesión basándose en tu rendimiento actual.

### Tipos de recomendación

**📈 Misma sesión anterior**
Si ya registraste este ejercicio en una sesión previa:
- Promedio de reps completadas ≥ objetivo → **↑ Sube el peso** (+2.5 kg)
- Promedio ≥ 85% del objetivo → **→ Mantén el peso**
- Promedio < 85% → **↓ Baja el peso** (-2.5 kg)

**📊 Grupo muscular similar**
Si no tienes historial del ejercicio exacto, la app usa el rendimiento de otros ejercicios del mismo grupo muscular para estimar un peso inicial.

**Primera vez**
Si es la primera vez registrando ese ejercicio, la app te recomienda usar la **guía de peso** del plan como referencia.

### Ajuste por fatiga acumulada

Los ejercicios que aparecen **tarde en la sesión** (posición 3 en adelante) reciben un ajuste porque el rendimiento baja naturalmente por la fatiga acumulada:

| Posición del ejercicio | Ajuste estimado |
|-----------------------|-----------------|
| 1–2 | Sin ajuste (esfuerzo base) |
| 3 | ~5% de corrección |
| 4 | ~10% de corrección |
| 5+ | ~15% de corrección |

> **Ejemplo:** Hiciste 6 reps en el ejercicio #3 (objetivo: 8). Normalmente eso indicaría bajar el peso, pero dado que estás al final de la sesión, la app corrige hacia arriba y te recomienda el mismo peso que harías "descansado".

### Fallo genuino vs. fatiga

Si el rendimiento es **muy bajo** (menos del 65% de las reps objetivo), la app lo considera **fallo genuino de fuerza** (no atribuible a fatiga) y muestra una nota informativa sin aplicar corrección hacia arriba. Indica que el peso base del ejercicio es demasiado alto.

---

## 7. Historial

Accede desde la barra de navegación → **"Historial"**.

### Tabla de registros
Columnas:
- **Músculo** — grupo muscular
- **Ejercicio** — nombre
- **Serie** — número de serie
- **Reps** — repeticiones completadas
- **Peso (kg)** — peso usado
- **Sesión** — a qué sesión corresponde
- **Fecha & Hora** — timestamp (ordenable)

### Funciones
- **Buscar:** Escribe en el campo de búsqueda para filtrar por ejercicio o músculo en tiempo real
- **Ordenar:** Toca el encabezado "Fecha & Hora" para alternar entre más reciente primero / más antiguo primero

---

## 8. Nutrición

Accede desde la barra de navegación → **"Nutrición"**.

### Configuración inicial del perfil alimenticio
Al entrar por primera vez, completa tu perfil:
- Preferencia dietética (omnívoro, vegetariano, vegano)
- Alergias o intolerancias
- Objetivo nutricional (alineado con tu objetivo de entrenamiento)
- Presupuesto (económico, normal, premium)

### Plan de comidas diario
La app genera un plan de 6–7 comidas adaptado a:
- Tu objetivo de entrenamiento
- El tipo de sesión del día (piernas = máximo glucógeno, por ejemplo)
- Tu hora de entrenamiento seleccionada

**Horario de selección de entrenamiento:**
- Escoge entre 19 franjas horarias (6:00 am a 8:00 pm)
- El plan de comidas se reorganiza en función del horario

**Comidas del día:**
| Comida | Contenido |
|--------|-----------|
| Pre-entreno | Carbohidratos + proteína (90 min antes) |
| Desayuno | Comida completa (proteína + carbos + grasas) |
| Almuerzo | Comida principal (proteína + carbos complejos + verduras) |
| Merienda 1 | Snack (carbos + proteína) |
| Post-entreno | Carbohidratos rápidos + batido de proteína |
| Cena | Proteína + verduras (carbos reducidos) |
| Merienda 2 | Snack ligero (si corresponde) |

**Recetas:** Toca cualquier comida para ver recetas con ingredientes, macros, costo y tiempo de preparación.

### Fundamentos de nutrición
Sección educativa con acordeones expandibles sobre:
- Proteína y síntesis muscular
- Carbohidratos y energía
- Grasas saludables
- Hidratación y electrolitos
- Timing de nutrientes

---

## 9. Progreso

Accede desde la barra de navegación → **"Progreso"**.

### Métricas rápidas (4 tarjetas)
| Tarjeta | Descripción |
|---------|-------------|
| Semanas seguidas 🔥 | Racha actual de semanas con al menos 1 sesión completada |
| Mejor racha 🏆 | Racha más larga conseguida |
| Sesiones esta semana 📅 | Total de la semana ISO actual |
| Días con nutrición 🍃 | Días del plan de comidas marcados esta semana |

### Registro de peso corporal
- Campo de texto para ingresar tu peso en kg
- Botón **"Guardar"** — registra la fecha y peso actuales
- **Gráfico de líneas** con evolución del peso
- **Indicador de delta:** `+5.2 kg` o `-1.8 kg` desde el primer registro

### Medidas corporales
- **5 campos opcionales:** Cintura, Cadera, Pecho, Brazo y Muslo (en cm)
- Ingresa solo las medidas que quieras registrar y toca **"✓ Guardar medidas"**
- Un registro por día — si ya guardaste ese día, los nuevos valores se fusionan sin borrar los anteriores
- **Tabla de última medida** con delta (Δ) respecto al primer registro (ej. `−3 cm`)
- **Gráfico de tendencia** — selector desplegable para elegir qué medida ver en el gráfico
- Visible solo cuando hay al menos 1 registro; sin datos muestra invitación a empezar

### Progresión de ejercicios
- Selector desplegable con todos los ejercicios que has registrado
- **Gráfico de peso máximo** por sesión (eje Y: peso en kg, eje X: fecha)

### Tendencia de bienestar
- **Gráfico dual** con dos líneas:
  - 🟢 Verde: Energía promedio (1–10)
  - 🟡 Amarillo: Fatiga promedio (1–10)
- Requiere mínimo 2 sesiones completadas con registro

### Notificaciones de entrenamiento
- Botón **"Habilitar recordatorios"** — pide permiso al navegador/sistema
- Botón **"Enviar prueba"** — manda una notificación de prueba inmediata
- Mensaje: *"¡Es hora de entrenar! 💪 Tu sesión de hoy te espera."*

---

## 10. Bienestar

Botón flotante (ícono de corazón o similar) disponible desde la pantalla principal.

### Flujo en 3 pasos

**Paso 1 — ¿Cómo te sientes?**
Selecciona los músculos que sientes adoloridos o con molestia (multi-selección):
- Cuádriceps, Glúteo, Isquiotibiales, Pantorrillas
- Core / Abdomen, Pecho, Espalda / Dorsal
- Hombros, Bíceps, Tríceps, Antebrazos

Toca **"Siguiente →"** (se activa con al menos 1 músculo seleccionado)

**Paso 2 — Intensidad del dolor**
Para cada músculo seleccionado, elige:
| Nivel | Descripción |
|-------|-------------|
| 1 — Leve | Leve molestia, no limita el movimiento |
| 2 — Moderado | Limita algo el rango de movimiento |
| 3 — Fuerte | Dificulta actividades del día a día |

**Paso 3 — Plan de recuperación**
Para cada músculo afectado, recibirás:
- **Tip de recuperación inmediata** (hielo, calor, movimiento suave)
- **Estiramientos específicos** con nombre, imagen y duración
- **Opciones de medicación** (si aplica según severidad):
  - Severidad 2: Anti-inflamatorio suave (ibuprofeno 400 mg post-comida)
  - Severidad 3: Anti-inflamatorio más intenso (ibuprofeno 400–600 mg cada 8 h, diclofenac tópico)
  - ⚠️ Siempre con aviso: *"Consulta a un médico antes de automedicarte."*

---

## 11. Reportes

Accede desde la barra de navegación → **"Reportes"**.

### Reportes disponibles

**📋 Plan de entrenamiento completo (PDF)**
Descarga un PDF organizado por fases y sesiones, con:
- Tabla de ejercicios por bloque muscular
- Series, reps, descanso, guía de peso y notas
- Ideal para compartir con un entrenador o coach

**📊 Historial de pesos (PDF)**
Descarga un PDF con todos tus registros de pesos, agrupado por músculo y ejercicio:
- Progresión cronológica de cada ejercicio
- Indicador de progreso (`↑ +X kg`)
- Última entrada resaltada en verde (mejor marca)
- Columnas: Fecha | Sesión | Peso × reps por serie | Volumen total

### Cómo descargar
1. Toca **"⬇️ Descargar PDF"** en el reporte deseado
2. La app abrirá una nueva ventana con el contenido formateado
3. Usa la función de impresión de tu navegador (`Ctrl+P` / `Cmd+P` / icono compartir en móvil) y selecciona "Guardar como PDF"

---

## 12. Gestión del plan

### Nuevo Ciclo
Cuando terminas tu plan o quieres empezar uno diferente:

1. Barra de navegación → **"Nuevo Ciclo"**
2. La app borrará **todos tus datos** (sesiones completadas, registros de ejercicio, plan actual) tanto en la app como en la nube
3. Se iniciará el onboarding desde cero para crear un plan nuevo

> **Nota:** Esta acción es irreversible. Todo el historial del ciclo anterior se elimina permanentemente.

### Reiniciar Progreso
Si quieres mantener el mismo plan pero borrar las marcas de sesiones completadas:

1. Barra de navegación → **"Reiniciar Progreso"**
2. Confirma la acción
3. Se borran los logs de sesiones y pesos registrados
4. **El plan de entrenamiento se mantiene intacto**

---

## 13. Navegación

### Barra superior

**Móvil:**
- Ícono de menú (☰) → abre/cierra la barra lateral
- Nombre de la sección actual + flecha → abre menú desplegable de módulos

**Escritorio:**
- Botones directos para cada módulo
- Email del usuario en la esquina derecha

### Módulos disponibles

| Módulo | Descripción |
|--------|-------------|
| 🏋️ Físico | Vista principal de entrenamiento (por defecto) |
| 🍃 Nutrición | Plan de comidas diario |
| 📈 Progreso | Métricas, gráficos y racha |
| 📋 Historial | Tabla de todos los pesos registrados |
| 📄 Reportes | Descarga de PDFs |

### Menú desplegable (móvil)
Además de los módulos, incluye:
- **Nuevo Ciclo** — regenerar plan
- **Reiniciar Progreso** — borrar marcas
- **Cerrar sesión** — logout

---

## 14. Datos y sincronización

### Almacenamiento
La app guarda datos en **dos lugares**:
1. **Local (localStorage)** — disponible sin internet
2. **Nube (Supabase)** — sincronizado automáticamente cuando hay conexión

### Datos que se guardan
| Dato | Local | Nube |
|------|-------|------|
| Plan de entrenamiento | ✓ | ✓ |
| Sesiones completadas | ✓ | ✓ |
| Pesos y reps por ejercicio | ✓ | ✓ |
| Peso corporal | ✓ | ✓ |
| Perfil nutricional | ✓ | ✓ |
| Plan de comidas diario | ✓ | — |
| Respuestas del onboarding | ✓ | ✓ |

### Comportamiento offline
- La app funciona **completamente sin internet**
- Los cambios se guardan localmente
- Al reconectar: banner azul **"Sincronizando…"** → banner verde **"✓ Sincronizado"**

### Banner de estado de conexión
| Estado | Color | Mensaje |
|--------|-------|---------|
| Sin conexión | 🟠 Naranja | "Sin conexión — cambios guardados localmente" |
| Sincronizando | 🔵 Azul | "Sincronizando..." |
| Sincronizado | 🟢 Verde | "✓ Sincronizado" (desaparece a los 2.5 seg) |

---

## 15. Lógica interna (referencia técnica)

Esta sección documenta la lógica de negocio del sistema para referencia de desarrollo y futuros cambios.

### Generación del plan (`planner.js`)

**Estructura de fases según duración:**

| Semanas | Fases | Distribución |
|---------|-------|--------------|
| 4 semanas | 2 fases | 2 + 2 |
| 8 semanas | 3 fases | 4 + 3 + 1 (deload) |
| 12 semanas | 4 fases | 4 + 4 + 3 + 1 (deload) |

**Regla de distribución de semanas:**
```
workWeeks = semanas - deloadWeeks
_baseWk = Math.floor(workWeeks / nonDeloadPhases)
Remainder = workWeeks - (_baseWk × nonDeloadPhases)
→ Se distribuye 1 semana extra a las primeras fases
```
Garantiza que `días × semanas = sesiones totales` exactas (sin pérdidas).

**Rangos de repeticiones por objetivo y fase:**

| Objetivo | Fase 1 | Fase 2 | Fase 3 | Fase 4 (deload) |
|----------|--------|--------|--------|-----------------|
| Fuerza | 6–8 | 4–6 | 3–5 | 8–10 |
| Hipertrofia | 12–15 | 8–12 | 6–10 | 12–15 |
| Perder peso | 15–20 | 12–15 | 12–15 | 15–20 |
| Resistencia | 20–25 | 15–20 | 15–20 | 20–25 |
| General | 12–15 | 10–12 | 8–10 | 12–15 |

**Descanso entre series por objetivo:**

| Objetivo | Compuesto | Aislamiento |
|----------|-----------|-------------|
| Fuerza | 180–300 seg | 90–120 seg |
| Hipertrofia | 90–120 seg | 60–90 seg |
| Perder peso | 60–75 seg | 45–60 seg |
| Resistencia | 45–60 seg | 30–45 seg |
| General | 90 seg | 60 seg |

**Progresión de volumen por fase:**
- Fase 1: Series base del ejercicio (MEV — volumen mínimo efectivo)
- Fase 2: +1 serie por ejercicio compuesto y core
- Fase 3: +2 series por compuesto/core (máximo 5 para compuestos, 4 para aislamiento)
- Fase 4 (deload): 2 series fijas, ejercicios principiante, sin progresión

**Selección de ejercicios:**
- Preferencia por ejercicios con carga en posición elongada para hipertrofia/fuerza (evidencia: Pedrosa 2022, Maeo 2023)
- Se evita repetir ejercicios ya usados en la misma semana (`usedExIds` Set)
- Filtro por entorno y nivel de dificultad

**Ciclo de templates:**
```
templateName = splitDays[d % splitDays.length]
```
Si `días > tipos de sesión`, cicla los templates garantizando ejercicios distintos.

### Progresión de peso (`progression.js`)

**`calcNextRecommendation(targetRepsStr, sets, position)`:**
1. Calcula `avgReps = promedio de reps en las series del historial`
2. Si `avgReps ≥ targetReps`: `dir = 'up'`, `nextWeight = lastWeight + 2.5`
3. Si `avgReps ≥ targetReps × 0.85`: `dir = 'eq'`, `nextWeight = lastWeight`
4. Si `avgReps < targetReps × 0.85`: `dir = 'down'`, `nextWeight = lastWeight - 2.5`
5. Ajuste por fatiga (si posición ≥ 3):
   - `fatigueFactor = min(0.15, (position - 2) × 0.05)`
   - Si `dir = 'down'` y no es fallo genuino → corrige con `nextWeight = lastWeight × (1 + fatigueFactor)`
6. Fallo genuino: si `avgReps < targetReps × 0.65` → nota informativa, sin corrección hacia arriba

**`calcCrossExRecommendation(weightGuide, relatedLogs)`:**
- Toma el rango de peso guía (ej. "40–60 kg")
- Calcula `ratio = avgReps / targetReps` de ejercicios relacionados
- Mapea el ratio a una posición del rango:
  - ratio ≥ 1.0 → 75% del rango (↑)
  - ratio ≥ 0.9 → 50% del rango (→)
  - ratio ≥ 0.85 → 35% del rango (→)
  - ratio < 0.85 → 20% del rango (↓)

### Nuevo Ciclo — flujo completo (`onboarding.js`)

Al confirmar "Nuevo Ciclo":
1. `clearAllUserData()` — borra todo el localStorage del usuario
2. `clearExLogs()` — borra logs de ejercicio en memoria
3. `deleteUserLogs(userId)` — elimina session_logs y exercise_logs de Supabase
4. `deleteUserPlan(userId)` — elimina el plan de training_plans en Supabase
5. `upsertUserPrefs(userId, { plan_meta: null })` — borra el plan_meta guardado
6. Abre onboarding con `_ob.answers = {}` (sin pre-relleno)

### Almacenamiento local — claves de localStorage

| Clave | Contenido |
|-------|-----------|
| `sv_plan_meta` | Respuestas del onboarding (JSON) |
| `sv_plan_cache` | Plan completo en caché (JSON array) |
| `sv_logs` | Logs de sesiones completadas (JSON array) |
| `sv_ex_{exId}_{sessionId}` | Log de ejercicio: sets, reps, fecha (JSON) |
| `sv_ex_swap_{exId}_{sessionId}` | ID del ejercicio de reemplazo |
| `sv_food_profile` | Perfil nutricional del usuario (JSON) |
| `sv_body_metrics` | Historial de peso corporal (JSON array) |
| `sv_meal_{YYYY-MM-DD}` | Comidas marcadas ese día (JSON array) |
| `sv_session_start_{id}` | Timestamp de inicio de sesión |
| `sv_session_end_{id}` | Timestamp de fin de sesión |
| `sv_user_id` | UUID del usuario autenticado |

### Tablas en Supabase

| Tabla | Función |
|-------|---------|
| `training_plans` | Plan completo (array de sesiones) |
| `session_logs` | Logs de sesiones completadas |
| `exercise_logs` | Pesos y reps por ejercicio y serie |
| `body_metrics` | Historial de peso corporal |
| `nutrition_logs` | Comidas marcadas por día |
| `user_preferences` | Perfil nutricional + plan_meta |

### Funciones globales expuestas a `window`

| Función | Descripción |
|---------|-------------|
| `loadSession(id)` | Cargar sesión en la vista principal |
| `togglePhase(ph)` | Expandir/colapsar fase en sidebar |
| `openExModal(id, name, ...)` | Abrir modal de ejercicio |
| `saveCurrentExLog()` | Guardar pesos y reps del modal |
| `openLogForm()` / `saveLog()` | Formulario de cierre de sesión |
| `showNewCycle()` | Iniciar nuevo ciclo (borra todo) |
| `resetProgress()` | Reiniciar solo el progreso |
| `openWellnessCheck()` | Abrir modal de bienestar |
| `navGoFisico()` / `navGoNutricion()` / etc. | Cambiar de módulo |
| `authSignIn()` / `authSignOut()` | Login y logout |
| `downloadPlanPDF()` / `downloadHistorialPDF()` | Generar PDFs |

---

*SistemaVida · Entrenamiento Físico — Manual de usuario*

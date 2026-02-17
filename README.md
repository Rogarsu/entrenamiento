# Imágenes locales para el proyecto "Entrenamiento"

Este README explica cómo añadir imágenes locales para que las veas sin conexión en `Index.html` y proporciona una lista sugerida de nombres de archivo.

**Qué contiene:**
- Lista sugerida de nombres de archivos para imágenes (puedes usar estos nombres o los tuyos).
- Recomendaciones de formato y tamaño.
- Ejemplo de cómo insertar o cambiar imágenes en `Index.html`.

**Dónde colocar las imágenes**
- Carpeta destino: `images/` (ya creada en el proyecto).
- Ruta completa de ejemplo: `c:\Users\USUARIO\OneDrive\Documentos\Roberto\Goals\Entrenamiento\images\vitamina_d3.png`

**Lista sugerida de nombres de archivo**
(Guárdalos exactamente si quieres que los placeholders ya existentes en `Index.html` funcionen.)

- `vitamina_d3.png`
- `ejercicios_caminadora.png`
- `suplementos_overview.png`
- `estiramientos_gato_vaca.png`
- `ejercicios_pecho_maquina.png`

Sugerencias adicionales para ejercicios y estiramientos (útiles si quieres agregar más imágenes):
- `ejercicio_pecho_1.png`
- `ejercicio_pecho_2.png`
- `ejercicio_espalda_1.png`
- `ejercicio_espalda_2.png`
- `ejercicio_pierna_prensa.png`
- `ejercicio_sentadilla_bulgara.png`
- `ejercicio_pantorrillas.png`
- `ejercicio_cardio_bike.png`
- `estiramiento_hamstring.png`
- `estiramiento_quad.png`
- `estiramiento_child_pose.png`

Puedes seguir el patrón: `seccion_descripcion_tipo.png` (ej.: `estiramiento_quad.png`) para mantener orden.

**Formatos recomendados y por qué**
- `.png` — recomendado para ilustraciones, iconos o cuando necesites transparencia. Conserva buena calidad.
- `.jpg` / `.jpeg` — recomendado para fotos; suelen tener archivos más livianos.
- Evita espacios en los nombres; usa `-` o `_`.
- Extensión alternativa: `.webp` (muy buena compresión) — solo usar si tu navegador/visor lo soporta.

**Tamaño y resolución recomendada**
- Ancho máximo: 1200 px. Ideal: 800 px para balance calidad/velocidad.
- Peso objetivo: < 500 KB por imagen cuando sea posible (usar compresión sin mucha pérdida).

**Cómo cambiar o añadir una imagen en `Index.html`**
- Opción 1: Pon el archivo en `images/` con uno de los nombres sugeridos. Abre `Index.html` en el navegador — la imagen aparecerá.
- Opción 2: Si quieres otro nombre, edita el atributo `src` del `img` correspondiente en `Index.html`. Ejemplo:

  ```html
  <img class="local-img" src="images/ejercicio_pecho_1.png" alt="Press de Pecho - Ejercicio 1">
  <div class="img-caption">Sugerido: <code>images/ejercicio_pecho_1.png</code></div>
  ```

**Ejemplo rápido de reemplazo**
- Si quieres mostrar `ejercicio_sentadilla_bulgara.png` en la sección de piernas, abre `Index.html`, busca la zona donde quieres el placeholder y pega o modifica la línea `src` como el ejemplo anterior.

**Consejos de compresión / herramientas**
- Windows: usa aplicaciones como `IrfanView` o `Paint.NET` para redimensionar y guardar en `.jpg/.png`.
- Web: `squoosh.app` (si tienes conexión) o usa `TinyPNG` para reducir peso sin perder calidad.

**Probar localmente**
- Abre `Index.html` con tu navegador (doble clic o `Abrir con -> navegador`). Las imágenes en `images/` se cargarán sin necesitar internet.

Si quieres, puedo:
- Añadir más nombres sugeridos automáticamente para cada ejercicio del HTML.
- Insertar placeholders adicionales directamente en `Index.html` (con los nombres que prefieras).

---
Creado automáticamente para ayudarte a organizar tus imágenes locales.

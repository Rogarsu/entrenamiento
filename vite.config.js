import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { writeFileSync } from 'fs'

// Fuerza un sw.js diferente en cada build → el navegador siempre detecta la nueva versión
writeFileSync('public/build-info.json', JSON.stringify({ v: Date.now() }))

export default defineConfig({
  build: { outDir: 'dist' },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      manifest: false,
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        // Solo pre-cachear assets de la app (NO imágenes GIF grandes)
        globPatterns: ['**/*.{js,css,html,svg,png,woff,woff2,json}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          // Imágenes GIF/WebP/AVIF: cachear bajo demanda (CacheFirst)
          {
            urlPattern: /\/images\/.*\.(gif|webp|avif|jpg|jpeg|png)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'exercise-images',
              expiration: { maxEntries: 800, maxAgeSeconds: 30 * 24 * 60 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts', expiration: { maxEntries: 10, maxAgeSeconds: 31536000 } }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'gstatic-fonts', expiration: { maxEntries: 10, maxAgeSeconds: 31536000 } }
          },
        ],
        navigateFallback: 'index.html',
      },
    })
  ]
})

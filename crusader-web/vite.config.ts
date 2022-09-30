import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Crusader',
        short_name: 'Crusader',
        description: 'Crusader is a free and open-source Warhammer 40,000 Crusade assistant.',
        theme_color: '#EA7317',
        background_color: '#EA7317',
        icons: [
          {
            src: '/android-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/android-icon.png',
            sizes: '1024x1024',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    outDir: './build'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});

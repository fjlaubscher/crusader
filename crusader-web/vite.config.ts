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
        description:
          'Crusader is a free and open-source Warhammer 40,000 Crusade assistant.',
        theme_color: '#1A202C',
        icons: [
          {
            src: '/android-icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            density: '4.0'
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

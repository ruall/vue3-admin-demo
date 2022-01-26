import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  resolve: {
    alias: [{ find: '/@', replacement: path.resolve(__dirname, 'src') }]
  },
  server: {
    proxy: {
      '/api': {
        target: isProduction
          ? 'https://pbadminapi.cheapp.com/justpower/sys/'
          : 'http://47.111.80.240:9191/justpower/sys/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    port: 4000
  },
  build: {
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'element-plus': ['element-plus']
        }
      }
    },
    chunkSizeWarningLimit: 600
  },
  optimizeDeps: {
    include: ['axios', 'nprogress']
  },
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('tailwindcss'),
        require('postcss-nested'),
        require('postcss-simple-vars'),
        require('postcss-import')
      ]
    }
  }
})

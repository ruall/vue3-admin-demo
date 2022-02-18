import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'

const pathSrc = path.resolve(__dirname, 'src')
const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  resolve: {
    alias: [{ find: '/@', replacement: pathSrc }]
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
  plugins: [
    vue(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue', 'vue-router'],
      // 自动导入 Element Plus 相关函数
      resolvers: [ElementPlusResolver()],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts')
    }),
    Components({
      resolvers: [
        IconsResolver({
          prefix: 'icon',
          enabledCollections: ['mdi']
        }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],
      dts: path.resolve(pathSrc, 'components.d.ts')
    }),
    Icons({
      autoInstall: true
    }),
    PkgConfig(),
    OptimizationPersist()
  ],
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

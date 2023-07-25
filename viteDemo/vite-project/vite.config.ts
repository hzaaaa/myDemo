import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'


import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), mockDevServerPlugin(), AutoImport({
    imports: [
      "vue",
      // "vue-router",
      // {
      //   moment: [["default", "moment"]],
      // },
    ],
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),],
  server: {
    proxy: {
      '^/api': 'http://example.com/',
    },
  },
})

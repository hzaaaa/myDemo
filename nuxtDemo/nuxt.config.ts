// https://nuxt.com/docs/api/configuration/nuxt-config
import vue from '@vitejs/plugin-vue'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig:{
    // The private keys which are only available server-side
    serve:'serveConfig',
    // Keys within public are also exposed client-side
    public: {
      all: 'allConfig'
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/_colors.scss" as *\n ;'
        }
      }
    },
    server: {
      proxy: {
        '^/api': 'http://example.com/',
      },
    },
    plugins: [ mockDevServerPlugin()]
  }
})

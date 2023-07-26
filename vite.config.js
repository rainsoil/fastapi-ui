import { defineConfig, loadEnv } from 'vite'
const { resolve } = require('path')
import createVitePlugins from './vite/plugins'
// https://vitejs.dev/config/
export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_BASE } = env
  return defineConfig({
    base: VITE_APP_BASE,
    resolve: {
      alias: {
        '~': resolve(__dirname, './'),
        "@": resolve(__dirname, "./src"),
        "components": resolve(__dirname, "./src/components"),
        "styles": resolve(__dirname, "./src/styles"),
        "utils": resolve(__dirname, "./src/utils"),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    plugins: createVitePlugins(env, command === 'build'),

    server: {
      proxy: {
        '/auth': {
          target: `http://172.16.6.95:10033`,
          // target: `http://172.16.14.14:10033`,
          changeOrigin: true,
          pathRewrite: {
            '^/auth': '/auth'
          }
        }
      }
    },
  })
}

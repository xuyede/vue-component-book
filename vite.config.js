import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueSetupExtend()],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  }
})

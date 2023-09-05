import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
	envDir: '../',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('/client/src', import.meta.url)),
    },
  },
})

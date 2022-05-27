import {fileURLToPath, URL} from 'url'
import {defineConfig} from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslintPlugin(), vue()],
  server: {
    open: '/index.html',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@fixtures': fileURLToPath(new URL('./tests/fixtures', import.meta.url)),
      '@unit': fileURLToPath(new URL('./tests/unit', import.meta.url)),
      '@e2e': fileURLToPath(new URL('./tests/e2e', import.meta.url)),
    },
  },
})

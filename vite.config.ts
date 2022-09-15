/// <reference types="vitest" />
import {defineConfig} from 'vite'
import {configDefaults} from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // server: {
  //   open: '/index.html',
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
      '@fixtures': path.resolve(__dirname, '/tests/fixtures'),
      '@unit': path.resolve(__dirname, '/tests/unit'),
      '@e2e': path.resolve(__dirname, '/tests/e2e'),
    },
  },
  test: {
    environment: 'jsdom', // or happy-dom ???
    globals: true,
    exclude: [...configDefaults.exclude, 'tests/e2e/*'],
  },
})

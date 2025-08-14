import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      'lunar-javascript': resolve(__dirname, 'node_modules/lunar-javascript/index.js')
    }
  },
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'public'),
  server: {
    fs: {
      allow: [resolve(__dirname)]
    },
    open: '/pages/home.html',
    base: '/'
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        fortune: resolve(__dirname, 'src/pages/fortune.html'),
        home: resolve(__dirname, 'src/pages/home.html'),
        result: resolve(__dirname, 'src/pages/result.html'),
        history: resolve(__dirname, 'src/pages/history.html'),
        profile: resolve(__dirname, 'src/pages/profile.html')
      }
    }
  }
})

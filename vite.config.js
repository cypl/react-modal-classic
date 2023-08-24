import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(dirname(fileURLToPath(import.meta.url)), 'src/lib/index.jsx'),      
      name: 'ReactModalClassic',
      fileName: (format) => `react-modal-classic.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        globals: {
          react: 'React'
        }
      }
    }
  },
  plugins: [react()]
})
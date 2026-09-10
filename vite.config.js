import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  // `sample/` is a reference copy of the design source with its own node_modules;
  // left in, Vitest would run its suite against a second copy of React.
  test: { environment: 'jsdom', setupFiles: './src/test/setup.js', globals: true, css: true, exclude: ['**/node_modules/**', '**/dist/**', 'sample/**'] },
})

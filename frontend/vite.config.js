import { defineConfig } from 'vite';


export default defineConfig({
  publicDir: './public',
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
});
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/weather-react-app",
  server: {
    proxy: {
      "/treasure": {
        target: "https://a.windbornesystems.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/treasure/, "/treasure"),
      },
    },
  },
})

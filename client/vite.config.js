import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
//everytime the fetching link has /api init then direct it to localhost:3000
export default defineConfig({
  server:{
    proxy:{
      '/api': {
        target: "http://127.0.0.1:3000",
        secure:false,
      },
    },
  },
  plugins: [react()],
})

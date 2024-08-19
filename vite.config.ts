import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/spbe-malkot/',
  plugins: [react()],
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         echarts: ["echarts"]
  //       }
  //     }
  //   }
  // }
})

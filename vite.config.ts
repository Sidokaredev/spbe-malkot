import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/spbe-malkot/",
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
  // server: {
  //   proxy: {
  //     "/api/v1": {
  //       target: "http://localhost:3000",
  //       changeOrigin: true,
  //       rewrite: (path: string) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
});

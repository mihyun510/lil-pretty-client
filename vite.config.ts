import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }, //@ alias 적용
  server: {
    port: 3000, //port 설정 - 기본 5173
    proxy: {
      "/auth": {
        target: "http://localhost:8080", // 백엔드 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, "/auth"), // 경로 유지
      },
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});

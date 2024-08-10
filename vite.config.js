import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      redux: "redux",
      "@reduxjs/toolkit": "@reduxjs/toolkit",
    },
  },
});

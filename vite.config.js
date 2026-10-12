import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/web2-course-project-front-end-CherylAitchedji/",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        addClothing: resolve(__dirname, "addClothing.html"),
        addOutfit: resolve(__dirname, "addOutfit.html"),
        clothing: resolve(__dirname, "clothing.html"),
        login: resolve(__dirname, "login.html"),
        register: resolve(__dirname, "register.html"),
        myCloset: resolve(__dirname, "myCloset.html"),
        myLooks: resolve(__dirname, "myLooks.html"),
        outfit: resolve(__dirname, "outfit.html"),
        updateClothing: resolve(__dirname, "updateClothing.html"),
        updateOutfit: resolve(__dirname, "updateOutfit.html"),
      },
    },
  },
});

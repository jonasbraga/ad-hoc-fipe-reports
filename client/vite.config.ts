import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Importando os estilos do Material-UI
    //@ts-ignore
    `import "@mui/material/styles";`,
  ],
  optimizeDeps: {
    // Excluindo o makeStyles do @mui/system para evitar problemas de tipos
    exclude: ["@mui/system/makeStyles"],
  },
});

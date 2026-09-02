import type { Config } from "tailwindcss";

/**
 * Sistema de color DR.UY — Caja de Herramientas.
 *  - Base clínica: blancos y grises neutros.
 *  - Primario de marca: azul profundo + acento teal (confianza médica + agilidad).
 *  - Colores de NIVEL (info / leve / moderado / grave): RESERVADOS para la
 *    interpretación de test clínicos y la severidad de alertas. No usarlos de
 *    forma decorativa en ningún otro contexto.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#14324f",
          deep: "#0d2338",
          soft: "#2d5a80",
        },
        teal: {
          DEFAULT: "#0e9aa1",
          deep: "#0b7a80",
          soft: "#5cc2c6",
        },
        ink: "#0f1b2d",
        slatey: "#5b6b7f",
        line: "#e4eaf1",
        mist: "#f4f7fa",
        nivel: {
          info: "#2563eb",
          "info-bg": "#e8effc",
          leve: "#16a34a",
          "leve-bg": "#e8f6ec",
          mod: "#e08a00",
          "mod-bg": "#fbf0dc",
          grave: "#dc2626",
          "grave-bg": "#fbe6e6",
        },
      },
      fontFamily: {
        display: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        body: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,27,45,0.04), 0 8px 24px -12px rgba(15,27,45,0.12)",
        pop: "0 12px 40px -12px rgba(15,27,45,0.22)",
      },
      maxWidth: {
        content: "1120px",
      },
    },
  },
  plugins: [],
};

export default config;

console.log("MONGODB_URI from process.env:", process.env.MONGODB_URI);
console.log("TEST_VARIABLE from process.env:", process.env.TEST_VARIABLE);
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  nitro: {
    plugins: ["~/server/db/index.ts"],
  },
  runtimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
});

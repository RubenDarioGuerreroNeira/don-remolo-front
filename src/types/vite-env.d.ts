/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Otras variables de entorno que puedas tener
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

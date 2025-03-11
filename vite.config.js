import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    allowedHosts: [
      'don-remolo-front.onrender.com',
      '.onrender.com',
      'localhost'
    ],
    // Quitamos el proxy ya que manejaremos las rutas directamente con axios
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion'],
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios']
  }
})





// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'


// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0',
//     port: process.env.PORT || 3000,
//     allowedHosts: [
//       'don-remolo-front.onrender.com',
//       '.onrender.com',
//       'localhost'
//     ],
//   },
//   preview: {
//     host: '0.0.0.0',
//     port: process.env.PORT || 3000,
//   }

// })






// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CarContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import ProductsPage from "./pages/ProductsPage";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/menu" element={<Menu />} /> */}
              <Route path="/productos" element={<ProductsPage />} />
              <Route path="/contacto" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </CartProvider>
  );
}

export default App;

// sin carrito de compras y sin notificaciones
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { CartProvider } from "./cotext/CarContext";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Menu from "./pages/Menu";
// import ProductsPage from "./pages/ProductsPage";
// import Contact from "./pages/Contact";
// import Footer from "./components/Footer";

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <main className="flex-grow">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             {/* <Route path="/menu" element={<Menu />} /> */}
//             <Route path="/productos" element={<ProductsPage />} />
//             <Route path="/contacto" element={<Contact />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

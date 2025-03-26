import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CarContext';
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from './pages/admin/Login';
import DashBoard from './pages/admin/DashBoard';
import Menu from "./pages/Menu";
import ProductsPage from "./pages/ProductsPage";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import CartPage from "./pages/CartPage";
import Gracias from "./pages/Gracias";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <AuthProvider>
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
                <Route path="/carrito" element={<CartPage />} />
                <Route path="/gracias" element={<Gracias />} />
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/DashBoard" element={
                  <ProtectedRoute>
                    <DashBoard />
                  </ProtectedRoute>
                } />
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
    </AuthProvider>
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

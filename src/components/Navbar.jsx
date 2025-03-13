// menu responsive
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define las rutas del menú
  const menuItems = [
    { name: "Inicio", path: "/" },
    { name: "Menu", path: "/productos" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="relative group flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
              >
                <span
                  className="text-5xl italic mr-2 font-display text-red-700 hover:text-red-800 
                               transition-all duration-300 border-b-2 border-transparent 
                               hover:border-red-700 transform hover:-translate-y-1"
                >
                  Don
                </span>
                <span
                  className="text-4xl font-serif tracking-wider text-red-800 
                               relative after:content-[''] after:absolute after:-bottom-2 
                               after:left-0 after:w-full after:h-0.5 after:bg-red-700 
                               after:transform after:scale-x-0 after:transition-transform 
                               after:duration-300 group-hover:after:scale-x-100"
                >
                  Remolo
                </span>
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="text-yellow-500 text-2xl ml-3"
                >
                  🍕
                </motion.span>
              </motion.div>
            </Link>
          </div>

          {/* Menú de navegación desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className="text-gray-700 hover:text-red-600 font-medium text-lg 
                           tracking-wide transition-colors duration-300 relative group"
                >
                  {item.name}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 
                                 transition-all duration-300 group-hover:w-full"
                  ></span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-red-600 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable con animación */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 
                             hover:text-red-600 hover:bg-gray-50 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;

// /// <reference types="vite/client" />
// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// function Navbar() {
//   // Define las rutas del menú
//   const menuItems = [
//     { name: "Inicio", path: "/" },
//     { name: "Menu", path: "/productos" },
//     { name: "Contacto", path: "/contacto" },
//   ];

//   return (
//     <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-20">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link to="/" className="relative group flex items-center">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="flex items-center"
//               >
//                 <span
//                   className="text-5xl italic mr-2 font-display text-red-700 hover:text-red-800
//                                transition-all duration-300 border-b-2 border-transparent
//                                hover:border-red-700 transform hover:-translate-y-1"
//                 >
//                   Don
//                 </span>
//                 <span
//                   className="text-4xl font-serif tracking-wider text-red-800
//                                relative after:content-[''] after:absolute after:-bottom-2
//                                after:left-0 after:w-full after:h-0.5 after:bg-red-700
//                                after:transform after:scale-x-0 after:transition-transform
//                                after:duration-300 group-hover:after:scale-x-100"
//                 >
//                   Remolo
//                 </span>
//                 <motion.span
//                   initial={{ rotate: 0 }}
//                   animate={{ rotate: 360 }}
//                   transition={{
//                     duration: 20,
//                     repeat: Infinity,
//                     ease: "linear",
//                   }}
//                   className="text-yellow-500 text-2xl ml-3"
//                 >
//                   🍕
//                 </motion.span>
//               </motion.div>
//             </Link>
//           </div>

//           {/* Menú de navegación */}
//           <div className="hidden md:flex items-center space-x-8">
//             {menuItems.map((item) => (
//               <motion.div
//                 key={item.name}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Link
//                   to={item.path}
//                   className="text-gray-700 hover:text-red-600 font-medium text-lg
//                            tracking-wide transition-colors duration-300 relative group"
//                 >
//                   {item.name}
//                   <span
//                     className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600
//                                  transition-all duration-300 group-hover:w-full"
//                   ></span>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>

//           {/* Menú móvil */}
//           <div className="md:hidden flex items-center">
//             <button className="text-gray-700 hover:text-red-600">
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path d="M4 6h16M4 12h16M4 18h16"></path>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Menú móvil desplegable (oculto por defecto) */}
//       <div className="hidden md:hidden">
//         <div className="px-2 pt-2 pb-3 space-y-1">
//           {menuItems.map((item) => (
//             <Link
//               key={item.name}
//               to={item.path}
//               className="block px-3 py-2 rounded-md text-base font-medium text-gray-700
//                        hover:text-red-600 hover:bg-gray-50"
//             >
//               {item.name}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

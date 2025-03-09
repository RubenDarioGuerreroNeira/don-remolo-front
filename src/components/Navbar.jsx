import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
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

          <div className="flex items-center space-x-12">
            {["Inicio", "Menú", "Contacto"].map((item, index) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item === "Inicio" ? "/" : `/${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-red-600 font-medium text-lg tracking-wide transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

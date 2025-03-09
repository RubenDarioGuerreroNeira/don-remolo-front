import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="font-display text-2xl text-primary">
              Don Remolo 
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary">Inicio</Link>
            <Link to="/menu" className="text-gray-700 hover:text-primary">Menú</Link>
            <Link to="/contacto" className="text-gray-700 hover:text-primary">Contacto</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
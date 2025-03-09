import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-xl mb-4">Horario</h3>
            <p>Lunes a Domingo</p>
            <p>12:00 - 23:00</p>
          </div>
          <div>
            <h3 className="font-display text-xl mb-4">Contacto</h3>
            <p>Teléfono: (+58) 04160897020</p>
            <p>Email: info@donremolo.com</p>
          </div>
          <div>
            <h3 className="font-display text-xl mb-4">Dirección</h3>
            <p>Calle Principal 123</p>
            <p>San Cristóbal , Venezuela</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>
            &copy; {new Date().getFullYear()} Rubén D.Guerrero N. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

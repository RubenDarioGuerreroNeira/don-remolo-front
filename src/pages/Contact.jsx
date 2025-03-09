import React from 'react';
import { motion } from 'framer-motion';

function Contact() {
  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="font-display text-4xl text-center mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Contacto
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-display text-2xl mb-6">Información de Contacto</h2>
          <div className="space-y-4">
            <motion.p 
              className="flex items-center"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="font-semibold w-24">Dirección:</span>
              <span>Calle Principal 123, Ciudad</span>
            </motion.p>
            <motion.p 
              className="flex items-center"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="font-semibold w-24">Teléfono:</span>
              <span>(123) 456-7890</span>
            </motion.p>
            <motion.p 
              className="flex items-center"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="font-semibold w-24">Email:</span>
              <span>info@osteria.com</span>
            </motion.p>
            <motion.p 
              className="flex items-center"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="font-semibold w-24">Horario:</span>
              <span>Lunes a Domingo: 12:00 - 23:00</span>
            </motion.p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-display text-2xl mb-6">Envíanos un Mensaje</h2>
          <form className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              />
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              ></textarea>
            </motion.div>
            
            <motion.button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-red-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enviar Mensaje
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Contact;
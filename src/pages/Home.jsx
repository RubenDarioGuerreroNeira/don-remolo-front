import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Home() {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'Pizza Margherita Tradicional'
    },
    {
      url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'Cócteles Artesanales'
    },
    {
      url: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'Pizza Quattro Formaggi'
    },
    {
      url: 'https://images.unsplash.com/photo-1527761939622-b91aec10d23c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'Negroni Clásico'
    },
    {
      url: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'Pizza Prosciutto e Funghi'
    },
    {
      url: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'Aperol Spritz'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      <div className="relative h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
              style={{ backgroundImage: `url(${images[currentIndex].url})` }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50">
              <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
                <div className="text-white">
                  <motion.h1 
                    className="font-display text-5xl mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {images[currentIndex].title}
                  </motion.h1>
                  <motion.p 
                    className="text-xl mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    La auténtica cocina italiana en el corazón de la ciudad
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <Link 
                      to="/menu" 
                      className="bg-primary text-white px-8 py-3 rounded-md hover:bg-red-900 transition-colors inline-block"
                    >
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                      >
                        Ver Menú
                      </motion.span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            className="font-display text-3xl text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Nuestras Especialidades
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Pasta Fresca', 'Vinos Selectos', 'Postres Artesanales'].map((item, index) => (
              <motion.div 
                key={item}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="font-display text-xl mb-2">{item}</h3>
                <p className="text-gray-600">
                  {index === 0 && "Elaborada diariamente en nuestra cocina"}
                  {index === 1 && "La mejor selección de vinos italianos"}
                  {index === 2 && "Dulces tradicionales italianos"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
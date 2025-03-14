
// modal 1
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Pizza Margherita Tradicional",
      description:
        "La auténtica pizza italiana, preparada con ingredientes frescos y horneada en nuestro horno de leña",
    },
    {
      url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Cócteles Artesanales",
      description:
        "Descubre nuestra selección de cócteles preparados por expertos bartenders",
    },
    {
      url: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Pizza Quattro Formaggi",
      description:
        "Una explosión de sabores con nuestra combinación de cuatro quesos selectos",
    },
    {
      url: "https://images.unsplash.com/photo-1595977437232-9a0426ebfe4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      title: "Negroni Clásico",
      description:
        "El clásico cóctel italiano, perfecto para acompañar tus momentos especiales",
    },
    {
      url: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Pizza Prosciutto e Funghi",
      description:
        "La combinación perfecta de jamón y hongos sobre nuestra masa artesanal",
    },
    {
      url: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Aperol Spritz",
      description:
        "El aperitivo italiano por excelencia, refrescante y lleno de sabor",
    },
  ];

  // Datos de especialidades
  const specialties = [
    {
      title: "Pizza a la Leña ",
      description:
        "Elaborada diariamente en nuestra cocina con las mejores materias primas importadas de Italia. Descubre el auténtico sabor de la pizza artesanal",
      image:
        "https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["Hecho en casa", "Tradicional", "Italiano"],
    },
    {
      title: "Vinos Selectos",
      description:
        "Nuestra cava cuenta con una exquisita selección de vinos italianos, cuidadosamente elegidos para complementar cada plato y ocasión especial.",
      image:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      tags: ["Importado", "Premium", "Selección especial"],
    },
    {
      title: "Emapanadas",
      description:
        "Descubre nuestras empanadas artesanales, preparadas con una receta familiar que combina la tradición argentina con ingredientes selectos. Cada empanada es un testimonio de nuestro compromiso con la calidad y el sabor.",
      image:
        "https://images.unsplash.com/photo-1679310249395-ae267ae0d273?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZW1wYW5hZGFzfGVufDB8fDB8fHww",
      tags: ["Artesanal", "Dulce", "Tradicional"],
    },
  ];



  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  const handleOpenModal = (specialty) => {
    setSelectedSpecialty(specialty);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSpecialty(null);
  };

  const Modal = ({ specialty, onClose }) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl max-w-2xl w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <img
              src={specialty.image}
              alt={specialty.title}
              className="w-full h-64 object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-6">
            <h3 className="font-display text-3xl mb-4">{specialty.title}</h3>
            <p className="text-gray-600 mb-4">{specialty.description}</p>
            <div className="space-y-2">

              <ul className="list-disc list-inside text-gray-600">

              </ul>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {specialty.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="relative">
      {/* Hero Section con Slider */}
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
                    {images[currentIndex].description}
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
              className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      {/* Sección de Especialidades Mejorada */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="font-display text-4xl text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Nuestras Especialidades
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialties.map((specialty, index) => (
              <motion.div
                key={specialty.title}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={specialty.image}
                    alt={specialty.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl mb-3 text-gray-800">
                    {specialty.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{specialty.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {specialty.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <motion.button
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation(); // Evita la propagación del evento
                      handleOpenModal(specialty);
                    }}
                  >
                    Saber más
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isModalOpen && selectedSpecialty && (
          <Modal specialty={selectedSpecialty} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;

// ------------------sin modal--------------------------------------------
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// function Home() {
//   const images = [
//     {
//       url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
//       title: "Pizza Margherita Tradicional",
//       description:
//         "La auténtica pizza italiana, preparada con ingredientes frescos y horneada en nuestro horno de leña",
//     },
//     {
//       url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
//       title: "Cócteles Artesanales",
//       description:
//         "Descubre nuestra selección de cócteles preparados por expertos bartenders",
//     },
//     {
//       url: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
//       title: "Pizza Quattro Formaggi",
//       description:
//         "Una explosión de sabores con nuestra combinación de cuatro quesos selectos",
//     },
//     {
//       url: "https://images.unsplash.com/photo-1595977437232-9a0426ebfe4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
//       title: "Negroni Clásico",
//       description:
//         "El clásico cóctel italiano, perfecto para acompañar tus momentos especiales",
//     },
//     {
//       url: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
//       title: "Pizza Prosciutto e Funghi",
//       description:
//         "La combinación perfecta de jamón y hongos sobre nuestra masa artesanal",
//     },
//     {
//       url: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
//       title: "Aperol Spritz",
//       description:
//         "El aperitivo italiano por excelencia, refrescante y lleno de sabor",
//     },
//   ];

//   // Datos de especialidades
//   const specialties = [
//     {
//       title: "Pizza a la Leña ",
//       description:
//         "Elaborada diariamente en nuestra cocina con las mejores materias primas importadas de Italia. Descubre el auténtico sabor de la pizza artesanal",
//             image:
//         "https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       tags: ["Hecho en casa", "Tradicional", "Italiano"],
//     },
//     {
//       title: "Vinos Selectos",
//       description:
//         "Nuestra cava cuenta con una exquisita selección de vinos italianos, cuidadosamente elegidos para complementar cada plato y ocasión especial.",
//       image:
//         "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//       tags: ["Importado", "Premium", "Selección especial"],
//     },
//     {
//       title: "Emapanadas",
//       description:
//         "Descubre nuestras empanadas artesanales, preparadas con una receta familiar que combina la tradición argentina con ingredientes selectos. Cada empanada es un testimonio de nuestro compromiso con la calidad y el sabor.",
//       image:
//         "https://images.unsplash.com/photo-1679310249395-ae267ae0d273?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZW1wYW5hZGFzfGVufDB8fDB8fHww",
//       tags: ["Artesanal", "Dulce", "Tradicional"],
//     },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 5000);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative">
//       {/* Hero Section con Slider */}
//       <div className="relative h-[600px] overflow-hidden">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentIndex}
//             initial={{ opacity: 0, scale: 1.1 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             transition={{ duration: 1 }}
//             className="absolute inset-0"
//           >
//             <div
//               className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
//               style={{ backgroundImage: `url(${images[currentIndex].url})` }}
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-50">
//               <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
//                 <div className="text-white">
//                   <motion.h1
//                     className="font-display text-5xl mb-4"
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.5 }}
//                   >
//                     {images[currentIndex].title}
//                   </motion.h1>
//                   <motion.p
//                     className="text-xl mb-8"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.7 }}
//                   >
//                     {images[currentIndex].description}
//                   </motion.p>
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.9 }}
//                   >
//                     <Link
//                       to="/menu"
//                       className="bg-primary text-white px-8 py-3 rounded-md hover:bg-red-900 transition-colors inline-block"
//                     >
//                       <motion.span
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="inline-block"
//                       >
//                         Ver Menú
//                       </motion.span>
//                     </Link>
//                   </motion.div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </AnimatePresence>

//         <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
//           {images.map((_, index) => (
//             <motion.button
//               key={index}
//               className={`w-3 h-3 rounded-full ${
//                 index === currentIndex ? "bg-white" : "bg-white/50"
//               }`}
//               onClick={() => setCurrentIndex(index)}
//               whileHover={{ scale: 1.2 }}
//               whileTap={{ scale: 0.9 }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Sección de Especialidades Mejorada */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4">
//           <motion.h2
//             className="font-display text-4xl text-center mb-4"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//           >
//             Nuestras Especialidades
//           </motion.h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {specialties.map((specialty, index) => (
//               <motion.div
//                 key={specialty.title}
//                 className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.2 }}
//                 whileHover={{ y: -10 }}
//               >
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={specialty.image}
//                     alt={specialty.title}
//                     className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
//                   />
//                 </div>
//                 <div className="p-6">
//                   <h3 className="font-display text-2xl mb-3 text-gray-800">
//                     {specialty.title}
//                   </h3>
//                   <p className="text-gray-600 mb-4">{specialty.description}</p>
//                   <div className="flex flex-wrap gap-2">
//                     {specialty.tags.map((tag) => (
//                       <span
//                         key={tag}
//                         className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="px-6 pb-6">
//                   <motion.button
//                     className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     Saber más
//                   </motion.button>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;

import React from "react";
import { motion } from "framer-motion";
import ProductList from "../components/productList";

function Menu() {
  const staticMenuItems = [
    {
      category: "Pasta",
      items: [
        {
          name: "Spaghetti Carbonara",
          description:
            "Pasta con huevo, queso pecorino, panceta y pimienta negra",
          price: "18.00",
        },
        {
          name: "Fettuccine Alfredo",
          description: "Pasta en salsa cremosa de queso parmesano",
          price: "16.00",
        },
      ],
    },
    {
      category: "Pizzas",
      items: [
        {
          name: "Margherita",
          description: "Tomate, mozzarella, albahaca fresca y aceite de oliva",
          price: "15.00",
        },
        {
          name: "Quattro Formaggi",
          description: "Mozzarella, gorgonzola, parmesano y fontina",
          price: "17.00",
        },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="font-display text-4xl text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Nuestro Menú
      </motion.h1>

      {/* Menú Estático */}
      {staticMenuItems.map((category, index) => (
        <motion.div key={index} className="mb-12" variants={itemVariants}>
          <h2 className="font-display text-3xl mb-6 text-primary">
            {category.category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {category.items.map((item, itemIndex) => (
              <motion.div
                key={itemIndex}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="font-display text-xl mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <p className="text-primary font-semibold">${item.price}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}




// pruductos d ela bd
      {/* Productos Dinámicos */}
      {/* <motion.div variants={itemVariants} className="mt-16">
        <h2 className="font-display text-3xl mb-6 text-primary">
          Productos Especiales
        </h2>
        <ProductList />
      </motion.div>
   */}
  
  
    </motion.div>



);



}

export default Menu;

// import React from 'react';
// import { motion } from 'framer-motion';

// function Menu() {
//   const menuItems = [
//     {
//       category: "Pasta",
//       items: [
//         {
//           name: "Spaghetti Carbonara",
//           description: "Pasta con huevo, queso pecorino, panceta y pimienta negra",
//           price: "18.00"
//         },
//         {
//           name: "Fettuccine Alfredo",
//           description: "Pasta en salsa cremosa de queso parmesano",
//           price: "16.00"
//         }
//       ]
//     },
//     {
//       category: "Pizzas",
//       items: [
//         {
//           name: "Margherita",
//           description: "Tomate, mozzarella, albahaca fresca y aceite de oliva",
//           price: "15.00"
//         },
//         {
//           name: "Quattro Formaggi",
//           description: "Mozzarella, gorgonzola, parmesano y fontina",
//           price: "17.00"
//         }
//       ]
//     }
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5
//       }
//     }
//   };

//   return (
//     <motion.div
//       className="max-w-7xl mx-auto px-4 py-12"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       <motion.h1
//         className="font-display text-4xl text-center mb-12"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         Nuestro Menú
//       </motion.h1>

//       {menuItems.map((category, index) => (
//         <motion.div
//           key={index}
//           className="mb-12"
//           variants={itemVariants}
//         >
//           <h2 className="font-display text-3xl mb-6 text-primary">{category.category}</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {category.items.map((item, itemIndex) => (
//               <motion.div
//                 key={itemIndex}
//                 className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <h3 className="font-display text-xl mb-2">{item.name}</h3>
//                 <p className="text-gray-600 mb-4">{item.description}</p>
//                 <p className="text-primary font-semibold">${item.price}</p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// }

// export default Menu;

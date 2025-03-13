// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { productService } from "../services/productService";
// import { Product, CategoryGroup } from "../types/product";
// import ProductList from "../components/ProductList";

// function NuestroMenu() {
//   const [menuItems, setMenuItems] = useState<CategoryGroup[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//       },
//     },
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const products = await productService.getAllProducts();

//       const groupedProducts = products.reduce((acc: CategoryGroup[], product: Product) => {
//         const productCategory = product.category || "Sin categoría";

//         const existingCategory = acc.find(group => group.category === productCategory);

//         if (existingCategory) {
//           existingCategory.items.push(product);
//         } else {
//           acc.push({
//             category: productCategory,
//             items: [product]
//           });
//         }

//         return acc;
//       }, []);

//       setMenuItems(groupedProducts);
//       setError(null);
//     } catch (err) {
//       console.error('Error al cargar productos:', err);
//       setError('Error al cargar el menú');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen">
//         <p className="text-red-600 text-xl mb-4">{error}</p>
//         <button
//           onClick={fetchProducts}
//           className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
//         >
//           Reintentar
//         </button>
//       </div>
//     );
//   }

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
//         <motion.div key={index} className="mb-12" variants={itemVariants}>
//           <h2 className="font-display text-3xl mb-6 text-primary">
//             {category.category}
//           </h2>
//           <ProductList products={category.items} />
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// }

// export default NuestroMenu;
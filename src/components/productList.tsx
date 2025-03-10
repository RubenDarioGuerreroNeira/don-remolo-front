import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Product, productService } from '../services/productService';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await productService.getAllProducts();
            console.log('Productos recibidos:', data); // Añadimos este log
            setProducts(data);
            setError(null);
        } catch (err) {
            console.error('Error detallado:', err); // Log más detallado del error
            setError('Error al cargar los productos');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <div className="text-red-600 font-semibold">{error}</div>
                <button
                    onClick={() => fetchProducts()}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
                <motion.div
                    key={product.id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <h3 className="font-display text-xl mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                        <p className="text-primary font-semibold">${product.price.toFixed(2)}</p>
                        <button
                            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
                            onClick={() => {
                                console.log('Añadir al carrito:', product);
                            }}
                        >
                            Agregar al carrito
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ProductList;




// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Product, productService } from '../services/productService';

// const ProductList: React.FC = () => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const fetchProducts = async () => {
//         try {
//             setLoading(true);
//             const data = await productService.getAllProducts();
//             console.log('Productos recibidos:', data); // Añadimos este log
//             setProducts(data);
//             setError(null);
//         } catch (err) {
//             console.error('Error detallado:', err); // Log más detallado del error
//             setError('Error al cargar los productos');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center py-8">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="text-center py-8">
//                 <div className="text-red-600 font-semibold">{error}</div>
//                 <button
//                     onClick={() => fetchProducts()}
//                     className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
//                 >
//                     Reintentar
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {products.map((product) => (
//                 <motion.div
//                     key={product.id}
//                     className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                 >
//                     {/* Añadimos una imagen si existe en tu modelo de datos */}
//                     {/* {product.image && (
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-48 object-cover rounded-lg mb-4"
//             />
//           )} */}
//                     <h3 className="font-display text-xl mb-2">{product.name}</h3>
//                     <p className="text-gray-600 mb-4">{product.description}</p>
//                     <div className="flex justify-between items-center">
//                         <p className="text-primary font-semibold">${product.price.toFixed(2)}</p>
//                         <button
//                             className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
//                             onClick={() => {
//                                 // Aquí puedes añadir la funcionalidad para agregar al carrito
//                                 console.log('Añadir al carrito:', product);
//                             }}
//                         >
//                             Agregar al carrito
//                         </button>
//                     </div>
//                 </motion.div>
//             ))}
//         </div>
//     );
// };

// export default ProductList;







// // import React, { useEffect, useState } from 'react';
// // import { motion } from 'framer-motion';
// // import { Product, productService } from '../services/productService';

// // const ProductList: React.FC = () => {
// //     const [products, setProducts] = useState<Product[]>([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState<string | null>(null);

// //     useEffect(() => {
// //         fetchProducts();
// //     }, []);

// //     const fetchProducts = async () => {
// //         try {
// //             setLoading(true);
// //             const data = await productService.getAllProducts();
// //             setProducts(data);
// //             setError(null);
// //         } catch (err) {
// //             setError('Error al cargar los productos');
// //             console.error(err);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     if (loading) {
// //         return <div className="text-center py-8">Cargando productos...</div>;
// //     }

// //     if (error) {
// //         return <div className="text-center py-8 text-red-600">Error: {error}</div>;
// //     }

// //     return (
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //             {products.map((product) => (
// //                 <motion.div
// //                     key={product.id}
// //                     className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
// //                     whileHover={{ scale: 1.02 }}
// //                     whileTap={{ scale: 0.98 }}
// //                 >
// //                     <h3 className="font-display text-xl mb-2">{product.name}</h3>
// //                     <p className="text-gray-600 mb-4">{product.description}</p>
// //                     <p className="text-primary font-semibold">${product.price.toFixed(2)}</p>
// //                 </motion.div>
// //             ))}
// //         </div>
// //     );
// // };

// // export default ProductList;


// // import React, { useEffect, useState } from 'react';
// // import { Product, productService } from '../services/productService';

// // const ProductList: React.FC = () => {
// //     // Estados para manejar los productos, loading y errores
// //     const [products, setProducts] = useState<Product[]>([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState<string | null>(null);

// //     // useEffect para cargar los productos cuando el componente se monta
// //     useEffect(() => {
// //         fetchProducts();
// //     }, []);

// //     // Función para obtener los productos
// //     const fetchProducts = async () => {
// //         try {
// //             setLoading(true);
// //             const data = await productService.getAllProducts();
// //             setProducts(data);
// //             setError(null);
// //         } catch (err) {
// //             setError('Error al cargar los productos');
// //             console.error(err);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     // Mostrar estado de carga
// //     if (loading) {
// //         return <div>Cargando productos...</div>;
// //     }

// //     // Mostrar error si existe
// //     if (error) {
// //         return <div>Error: {error}</div>;
// //     }

// //     // Renderizar la lista de productos
// //     return (
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
// //             {products.map((product) => (
// //                 <div
// //                     key={product.id}
// //                     className="border rounded-lg p-4 shadow-md"
// //                 >
// //                     <h2 className="text-xl font-bold">{product.name}</h2>
// //                     <p className="text-gray-600">{product.description}</p>
// //                     <p className="text-green-600 font-bold mt-2">
// //                         ${product.price.toFixed(2)}
// //                     </p>
// //                 </div>
// //             ))}
// //         </div>
// //     );
// // };

// // export default ProductList;
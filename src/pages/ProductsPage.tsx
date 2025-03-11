import React, { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { productService } from '../services/productService';
import ProductList from '../components/ProductList';
import { ProductSkeleton } from '../components/ProductSkeleton';
import { ProductCard } from '../components/ProductCard';

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Función para validar la estructura de los datos
    // const isValidProductData = (data: any): data is Product[] => {
    //     if (!Array.isArray(data)) {
    //         console.error('Los datos no son un array:', data);
    //         return false;
    //     }

    //     return data.every(item => {
    //         const isValid =
    //             typeof item.id === 'string' &&
    //             typeof item.name === 'string' &&
    //             typeof item.price === 'number' &&
    //             typeof item.description === 'string' &&
    //             typeof item.category === 'string' &&
    //             typeof item.stockIn === 'number'; // Validar campo adicional

    //         if (!isValid) {
    //             console.error('Producto con formato inválido:', item);
    //         }

    //         return isValid;
    //     });
    // };


    // const isValidProductData = (data: any): data is Product[] => {
    //     if (!Array.isArray(data)) {
    //         console.error('Los datos no son un array:', data);
    //         return false;
    //     }

    //     return data.every(item => {
    //         // Convertir price a número si viene como string
    //         if (typeof item.price === 'string') {
    //             item.price = parseFloat(item.price);
    //         }

    //         const isValid =
    //             typeof item.id === 'string' &&
    //             typeof item.name === 'string' &&
    //             typeof item.price === 'number' && // Ya convertido a número
    //             typeof item.description === 'string' &&
    //             typeof item.category === 'string' &&
    //             typeof item.stockIn === 'number';

    //         if (!isValid) {
    //             console.error('Producto con formato inválido:', item);
    //         }

    //         return isValid;
    //     });
    // };

    const isValidProductData = (data: any): data is Product[] => {
        if (!Array.isArray(data)) {
            console.error('Los datos no son un array:', data);
            return false;
        }

        return data.every(item => {
            // Crear una copia del objeto para evitar modificar los datos originales
            const product = { ...item };

            // Convertir price a número si viene como string
            if (typeof product.price === 'string') {
                product.price = parseFloat(product.price);
            }

            const isValid =
                typeof product.id === 'string' &&
                typeof product.name === 'string' &&
                typeof product.price === 'number' &&
                typeof product.description === 'string' &&
                typeof product.category === 'string' &&
                typeof product.stockIn === 'number';

            if (!isValid) {
                console.error('Producto con formato inválido:', product);
            }

            return isValid;
        });
    };



    useEffect(() => {
        // const fetchProducts = async () => {
        //     try {
        //         setLoading(true);
        //         setError(null);

        //         const response = await productService.getAllProducts();

        //         // Log para debugging
        //         console.log('Datos recibidos:', response);

        //         // Extraer el array de productos del objeto recibido
        //         const { items } = response;

        //         if (!isValidProductData(items)) {
        //             throw new Error('Los datos recibidos no tienen el formato esperado');
        //         }

        //         setProducts(items);
        //     } catch (err) {
        //         console.error('Error completo:', err);
        //         setError(err instanceof Error ? err.message : 'Error desconocido');
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        // const fetchProducts = async () => {
        //     try {
        //         setLoading(true);
        //         setError(null);

        //         const response = await productService.getAllProducts();
        //         console.log('Datos recibidos:', response);

        //         const { items } = response;

        //         if (!Array.isArray(items)) {
        //             throw new Error('Los datos recibidos no tienen el formato esperado');
        //         }

        //         // Transformar price en número si es string
        //         const transformedItems = items.map(item => ({
        //             ...item,
        //             price: typeof item.price === 'string' ? parseFloat(item.price) : item.price
        //         }));

        //         if (!isValidProductData(transformedItems)) {
        //             throw new Error('Los datos recibidos no tienen el formato esperado');
        //         }

        //         setProducts(transformedItems);
        //     } catch (err) {
        //         console.error('Error completo:', err);
        //         setError(err instanceof Error ? err.message : 'Error desconocido');
        //     } finally {
        //         setLoading(false);
        //     }
        // };


        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await productService.getAllProducts();
                console.log('Datos recibidos:', response);

                const { items } = response;

                if (!Array.isArray(items)) {
                    throw new Error('Los datos recibidos no tienen el formato esperado');
                }

                // Asegurar que todos los valores tengan los tipos correctos
                const transformedItems: Product[] = items.map(item => ({
                    id: String(item.id),
                    name: String(item.name),
                    price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
                    description: String(item.description),
                    category: String(item.category),
                    stockIn: Number(item.stockIn),
                }));

                if (!isValidProductData(transformedItems)) {
                    throw new Error('Los datos recibidos no tienen el formato esperado');
                }

                setProducts(transformedItems);
            } catch (err) {
                console.error('Error completo:', err);
                setError(err instanceof Error ? err.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };


        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <ProductSkeleton key={index} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Nuestros Productos</h1>

            {products.length === 0 ? (
                <p className="text-gray-500">No hay productos disponibles.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsPage;



// import React, { useEffect, useState } from 'react';
// import { Product } from '../types/product';
// import { productService } from '../services/productService';
// import ProductList from '../components/ProductList';
// import { ProductSkeleton } from '../components/ProductSkeleton';
// import { ProductCard } from '../components/ProductCard';

// const ProductsPage: React.FC = () => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // Función para validar la estructura de los datos
//     const isValidProductData = (data: any): data is Product[] => {
//         if (!Array.isArray(data)) {
//             console.error('Los datos no son un array:', data);
//             return false;
//         }

//         return data.every(item => {
//             const isValid =
//                 typeof item.id === 'string' &&
//                 typeof item.name === 'string' &&
//                 typeof item.price === 'number' &&
//                 typeof item.description === 'string' &&
//                 typeof item.category === 'string';

//             if (!isValid) {
//                 console.error('Producto con formato inválido:', item);
//             }

//             return isValid;
//         });
//     };

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);

//                 const response = await productService.getAllProducts();

//                 // Log para debugging
//                 console.log('Datos recibidos:', response);

//                 // Extraer el array de productos del objeto recibido
//                 const { items } = response;

//                 if (!isValidProductData(items)) {
//                     throw new Error('Los datos recibidos no tienen el formato esperado');
//                 }

//                 setProducts(items);
//             } catch (err) {
//                 console.error('Error completo:', err);
//                 setError(err instanceof Error ? err.message : 'Error desconocido');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     if (loading) {
//         return (
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {[...Array(6)].map((_, index) => (
//                         <ProductSkeleton key={index} />
//                     ))}
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="container mx-auto px-4 py-8">
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//                     <strong className="font-bold">Error: </strong>
//                     <span className="block sm:inline">{error}</span>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-3xl font-bold mb-8">Nuestros Productos</h1>

//             {products.length === 0 ? (
//                 <p className="text-gray-500">No hay productos disponibles.</p>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {products.map((product) => (
//                         <ProductCard key={product.id} product={product} />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProductsPage;


// import React, { useEffect, useState } from 'react';
// import { Product } from '../types/product';
// import { productService } from '../services/productService';
// import { ProductCard } from '../components/ProductCard';
// import { ProductSkeleton } from '../components/ProductSkeleton';
// import { ApiDebug } from '../components/ApiDebug'
// export const ProductsPage: React.FC = () => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // Función para validar la estructura de los datos
//     const isValidProductData = (data: any): data is Product[] => {
//         if (!Array.isArray(data)) {
//             console.error('Los datos no son un array:', data);
//             return false;
//         }

//         return data.every(item => {
//             const isValid =
//                 typeof item.id === 'string' &&
//                 typeof item.name === 'string' &&
//                 typeof item.price === 'number' &&
//                 typeof item.description === 'string' &&
//                 typeof item.category === 'string';

//             if (!isValid) {
//                 console.error('Producto con formato inválido:', item);
//             }

//             return isValid;
//         });
//     };

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);

//                 const response = await productService.getAllProducts();

//                 // Log para debugging
//                 console.log('Datos recibidos:', response);

//                 if (!isValidProductData(response)) {
//                     throw new Error('Los datos recibidos no tienen el formato esperado');
//                 }

//                 setProducts(response);
//             } catch (err) {
//                 console.error('Error completo:', err);
//                 setError(err instanceof Error ? err.message : 'Error desconocido');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     if (loading) {
//         return (
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {[...Array(6)].map((_, index) => (
//                         <ProductSkeleton key={index} />
//                     ))}
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="container mx-auto px-4 py-8">
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//                     <strong className="font-bold">Error: </strong>
//                     <span className="block sm:inline">{error}</span>
//                 </div>
//             </div>
//         );
//     }

//     // Componente de debug temporal
//     const DebugData: React.FC<{ data: any }> = ({ data }) => {
//         return import.meta.env.DEV ? (
//             <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-md overflow-auto">
//                 <h3 className="font-bold mb-2">Debug Data:</h3>
//                 <pre className="text-xs">
//                     {JSON.stringify(data, null, 2)}
//                 </pre>
//             </div>
//         ) : null;
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-3xl font-bold mb-8">Nuestros Productos</h1>

//             {products.length === 0 ? (
//                 <p className="text-gray-500">No hay productos disponibles.</p>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {products.map((product) => (
//                         <ProductCard key={product.id} product={product} />
//                     ))}
//                 </div>
//             )}

//             <DebugData data={products} />
//         </div>
//     );
// };

// export default ProductsPage




// import React, { useEffect, useState } from 'react';
// import { Product } from '../types/product';
// import { productService } from '../services/productService';
// import { ProductCard } from '../components/ProductCard';
// import { ProductSkeleton } from '../components/ProductSkeleton';

// export const ProductsPage: React.FC = () => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // Función para validar la estructura de los datos
//     const isValidProductData = (data: any): data is Product[] => {
//         if (!Array.isArray(data)) {
//             console.error('Los datos no son un array:', data);
//             return false;
//         }

//         return data.every(item => {
//             const isValid =
//                 typeof item.id === 'string' &&
//                 typeof item.name === 'string' &&
//                 typeof item.price === 'number' &&
//                 typeof item.description === 'string' &&
//                 typeof item.category === 'string';

//             if (!isValid) {
//                 console.error('Producto con formato inválido:', item);
//             }

//             return isValid;
//         });
//     };


//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);
//                 const data = await productService.getAllProducts();

//                 if (!Array.isArray(data)) {
//                     throw new Error('Los datos recibidos no tienen el formato esperado');
//                 }

//                 setProducts(data);
//             } catch (err) {
//                 const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
//                 setError(`Error al cargar los productos: ${errorMessage}`);
//                 console.error('Error completo:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);

//     // Agrupar productos por categoría
//     const productsByCategory = products.reduce((acc, product) => {
//         const category = product.category;
//         if (!acc[category]) {
//             acc[category] = [];
//         }
//         acc[category].push(product);
//         return acc;
//     }, {} as Record<string, Product[]>);

//     if (loading) {
//         return (
//             <div className="container mx-auto px-4 py-8">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                     {[...Array(8)].map((_, index) => (
//                         <ProductSkeleton key={index} />
//                     ))}
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex justify-center items-center min-h-screen">
//                 <div className="text-red-600">{error}</div>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-3xl font-bold mb-8">Nuestros Productos</h1>

//             {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
//                 <div key={category} className="mb-8">
//                     <h2 className="text-2xl font-semibold mb-4 text-gray-800 capitalize">
//                         {category}
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                         {categoryProducts.map((product) => (
//                             <ProductCard key={product.id} product={product} />
//                         ))}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };



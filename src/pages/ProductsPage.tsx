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

    const isValidProductData = (data: any): data is Product[] => {
        if (!Array.isArray(data)) {
            console.error('Los datos no son un array:', data);
            return false;
        }

        return data.every(item => {
            const product = { ...item };

            if (typeof product.price === 'string') {
                product.price = parseFloat(product.price);
            }

            const isValid =
                typeof product.id === 'string' &&
                typeof product.name === 'string' &&
                typeof product.price === 'number' &&
                typeof product.description === 'string' &&
                typeof product.image === 'string' &&
                typeof product.category === 'string' &&
                typeof product.stockIn === 'number';

            if (!isValid) {
                console.error('Producto con formato inválido:', product);
            }

            return isValid;
        });
    };

    useEffect(() => {
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
                    image: String(item.image), // Asegúrate de incluir la propiedad `image`
                    category: typeof item.category === 'object' && item.category !== null ? item.category.name : item.category,
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



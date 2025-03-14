import React, { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { productService } from '../services/productService';
import ProductList from '../components/ProductList';
import { ProductSkeleton } from '../components/ProductSkeleton';
import { ProductCard } from '../components/ProductCard';
import { FaShoppingCart } from 'react-icons/fa';

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [categories, setCategories] = useState<string[]>([]);

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

    const fetchProducts = async (page: number) => {
        try {
            setLoading(true);
            setError(null);

            const response = await productService.getAllProducts(page);
            console.log('Datos recibidos:', response);

            const { items, total, limit } = response;

            if (!Array.isArray(items)) {
                throw new Error('Los datos recibidos no tienen el formato esperado');
            }

            const transformedItems: Product[] = items.map(item => ({
                id: String(item.id),
                name: String(item.name),
                price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
                description: String(item.description),
                image: String(item.image),
                category: typeof item.category === 'object' && item.category !== null ? item.category.name : item.category,
                stockIn: Number(item.stockIn),
            }));

            if (!isValidProductData(transformedItems)) {
                throw new Error('Los datos recibidos no tienen el formato esperado');
            }

            setProducts(transformedItems);

            // Extraer categorías únicas de los productos
            // Extraer categorías únicas de los productos y asegurarse de que son strings
            const uniqueCategories = Array.from(
                new Set(
                    transformedItems.map(item =>
                        typeof item.category === 'object'
                            ? item.category.name
                            : item.category
                    )
                )
            );

            // Ahora uniqueCategories es definitivamente un array de strings
            setCategories(uniqueCategories);


            setTotalPages(Math.ceil(total / limit));
            setCurrentPage(page);
        } catch (err) {
            console.error('Error completo:', err);
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

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

            {/* Filtro de categorías */}
            <div className="mb-6 flex justify-end">
                {/* <div className="mb-6">// aparece en el lado derecho */}
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                >
                    <option value="">Todas las categorías</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {filteredProducts.length === 0 ? (
                <p className="text-gray-500">No hay productos disponibles.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product}>
                            <button className="absolute top-2 right-2 bg-primary text-white p-2 rounded-full">
                                <FaShoppingCart />
                            </button>
                        </ProductCard>
                    ))}
                </div>
            )}

            <div className="flex justify-center mt-8">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-1 bg-primary text-white rounded disabled:opacity-50"
                >
                    Anterior
                </button>
                <span className="px-4 py-2 mx-1">{currentPage} de {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-1 bg-primary text-white rounded disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default ProductsPage;





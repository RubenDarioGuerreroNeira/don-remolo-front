import React from 'react';
import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Product, Category } from '../../types/product';


interface ProductFormData {
    name: string;
    price: number;
    description: string;
    category: string; // Aquí solo manejamos el string
    image: string;
    stockIn: number;
}

function Dashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form state
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        price: 0,
        description: '',
        category: '',
        image: '',
        stockIn: 0
    });

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const handleDelete = (productId: string) => {
        setProducts(products.filter(product => product.id !== productId));
        // Here you would typically also make an API call to delete the product
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            description: product.description,
            category: typeof product.category === 'string'
                ? product.category
                : product.category.name,
            image: product.image,
            stockIn: product.stockIn
        });
        setIsModalOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stockIn' ? Number(value) : value
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const productData: Product = {
            id: editingProduct?.id || Date.now().toString(),
            name: formData.name,
            price: formData.price,
            description: formData.description,
            category: formData.category, // Aquí se asigna directamente como string
            image: formData.image,
            stockIn: formData.stockIn
        };
        if (editingProduct) {
            setProducts(products.map(p =>
                p.id === editingProduct.id ? productData : p
            ));
        } else {
            setProducts([...products, productData]);
        }
        // Reset form and close modal
        setIsModalOpen(false);
        setEditingProduct(null);
        setFormData({
            name: '',
            price: 0,
            description: '',
            category: '',
            image: '',
            stockIn: 0
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Panel Administrativo
                            </h1>
                        </div>
                        <div className="flex items-center">
                            <motion.button
                                onClick={handleLogout}
                                className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Cerrar Sesión
                            </motion.button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <motion.button
                        onClick={() => setIsModalOpen(true)}
                        className="mb-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Agregar Nuevo Producto
                    </motion.button>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <motion.div
                                key={product.id}
                                className="bg-white overflow-hidden shadow rounded-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="p-5">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover rounded-md"
                                    />
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                                        {product.name}
                                    </h3>
                                    <p className="mt-2 text-gray-600">{product.description}</p>
                                    <p className="mt-2 text-gray-800">Precio: ${product.price}</p>
                                    <p className="text-gray-800">Stock: {product.stockIn}</p>
                                    <div className="mt-4 flex justify-end space-x-2">
                                        <motion.button
                                            onClick={() => handleEdit(product)}
                                            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Editar
                                        </motion.button>
                                        <motion.button
                                            onClick={() => handleDelete(product.id)}
                                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Eliminar
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Modal para editar/crear productos */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-lg p-6 w-full max-w-md"
                    >
                        <h2 className="text-xl font-bold mb-4">
                            {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Precio
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Descripción
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Categoría
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    URL de la imagen
                                </label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    name="stockIn"
                                    value={formData.stockIn}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingProduct(null);
                                    }}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    {editingProduct ? 'Actualizar' : 'Crear'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
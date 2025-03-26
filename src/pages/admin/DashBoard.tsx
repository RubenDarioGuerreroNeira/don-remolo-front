import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [items, setItems] = useState([
        ...specialties // Aquí puedes importar los datos iniciales de tu archivo Home.jsx
    ]);
    const [editingItem, setEditingItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const handleDelete = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleSave = (updatedItem) => {
        if (editingItem) {
            setItems(items.map(item =>
                item.title === editingItem.title ? updatedItem : item
            ));
        } else {
            setItems([...items, updatedItem]);
        }
        setIsModalOpen(false);
        setEditingItem(null);
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
                        Agregar Nuevo Item
                    </motion.button>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-white overflow-hidden shadow rounded-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="p-5">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-48 object-cover rounded-md"
                                    />
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-gray-600">{item.description}</p>
                                    <div className="mt-4 flex justify-end space-x-2">
                                        <motion.button
                                            onClick={() => handleEdit(item)}
                                            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Editar
                                        </motion.button>
                                        <motion.button
                                            onClick={() => handleDelete(index)}
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

            {/* Modal para editar/crear items */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-lg p-6 w-full max-w-md"
                    >
                        <h2 className="text-xl font-bold mb-4">
                            {editingItem ? 'Editar Item' : 'Nuevo Item'}
                        </h2>
                        {/* Aquí iría el formulario para editar/crear items */}
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleSave(editingItem)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                            >
                                Guardar
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
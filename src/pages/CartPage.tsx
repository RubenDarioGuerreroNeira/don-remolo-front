import React, { useState } from 'react';
import { useCart } from '../context/CarContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Order } from '../types/order';

interface CustomerForm {
    name: string;
    phone: string;
    address: string;
}
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const CartPage: React.FC = () => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart
    } = useCart();

    const [showForm, setShowForm] = useState(false);
    const [customerData, setCustomerData] = useState<CustomerForm>({
        name: '',
        phone: '',
        address: ''
    });

    const handleRemoveItem = (productId: string, productName: string) => {
        removeFromCart(productId);
        toast.info(`${productName} eliminado del carrito`);
    };

    const handleUpdateQuantity = (productId: string, currentQuantity: number, delta: number) => {
        const newQuantity = currentQuantity + delta;
        if (newQuantity > 0) {
            updateQuantity(productId, newQuantity);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomerData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const order: Order = {
                items: cartItems.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                })),
                total: getCartTotal(),
                createdAt: new Date().toISOString(),
                customerName: customerData.name,
                customerPhone: customerData.phone,
                customerAddress: customerData.address
            };

            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order)
            });

            if (!response.ok) {
                throw new Error('Error al crear la orden');
            }

            // Corrección en la sintaxis del map
            const orderDetails = cartItems.map(item =>
                `${item.name} x ${item.quantity}`
            ).join(', ');

            const whatsappMessage = encodeURIComponent(
                `Hola, he realizado un pedido con los siguientes productos:\n\n` +
                `Productos: ${orderDetails}\n` +
                `Total: $${getCartTotal().toFixed(2)}\n\n` +
                `Datos de entrega:\n` +
                `Nombre: ${customerData.name}\n` +
                `Teléfono: ${customerData.phone}\n` +
                `Dirección: ${customerData.address}`
            );

            // Abrir WhatsApp en nueva pestaña
            window.open(`https://wa.me/+5804160897020?text=${whatsappMessage}`, '_blank');

            toast.success('Orden creada exitosamente');
            clearCart();
            setShowForm(false);
            setCustomerData({ name: '', phone: '', address: '' });

        } catch (error) {
            toast.error('Error al procesar la orden');
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Carrito de Compras</h1>
                <button
                    onClick={() => {
                        clearCart();
                        toast.info('Carrito vaciado');
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                    Vaciar Carrito
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md">
                {/* Cart items section - unchanged */}
                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center p-4 border-b last:border-b-0">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-grow ml-4">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-gray-600">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                                    className="p-1 rounded-full hover:bg-gray-100"
                                >
                                    <FaMinus className="text-gray-500" />
                                </button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                                    className="p-1 rounded-full hover:bg-gray-100"
                                >
                                    <FaPlus className="text-gray-500" />
                                </button>
                            </div>
                            <button
                                onClick={() => handleRemoveItem(item.id, item.name)}
                                className="p-2 text-red-500 hover:text-red-700 transition-colors"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}

                <div className="p-4 border-t">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">Total:</span>
                        <span className="font-bold text-xl">${getCartTotal().toFixed(2)}</span>
                    </div>

                    {!showForm ? (
                        <button
                            onClick={() => setShowForm(true)}
                            className="w-full mt-4 bg-primary text-white py-2 rounded hover:bg-primary-dark transition-colors"
                        >
                            Generar Orden de Compra
                        </button>
                    ) : (
                        <form onSubmit={handleCreateOrder} className="mt-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nombre
                                    <input
                                        type="text"
                                        name="name"
                                        value={customerData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Teléfono
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={customerData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Dirección
                                    <input
                                        type="text"
                                        name="address"
                                        value={customerData.address}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                                    />
                                </label>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-primary text-white py-2 rounded hover:bg-primary-dark transition-colors"
                                >
                                    Confirmar Orden
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition-colors"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartPage;



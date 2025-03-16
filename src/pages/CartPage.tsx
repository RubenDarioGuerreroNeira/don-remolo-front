import React from 'react';
import { useCart } from '../context/CarContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CartPage: React.FC = () => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart
    } = useCart();

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

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>
                <p className="text-gray-500">No hay productos en el carrito</p>
            </div>
        );
    }

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
                    <button
                        onClick={() => {
                            // Aquí iría la lógica para proceder al pago
                            toast.info('Procesando pago...');
                        }}
                        className="w-full mt-4 bg-primary text-white py-2 rounded hover:bg-primary-dark transition-colors"
                    >
                        Proceder al Pago
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
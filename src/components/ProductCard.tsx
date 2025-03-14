import React from 'react';
import { Product } from '../types/product';

interface ProductCardProps {
    product: Product;
    children?: React.ReactNode; // Añadir children como propiedad opcional
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, children }) => {
    console.log('Producto renderizado:', product); // Depuración

    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow relative">
            {/* Mostrar la imagen del producto */}
            {product.image && product.image !== 'undefined' && product.image.trim() !== '' && (
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
            )}
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">
                    ${product.price.toFixed(2)}
                </span>

                {/* Solo mostrar category si es un string */}
                {typeof product.category === 'string' && (
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {product.category}
                    </span>
                )}
            </div>
            {children} {/* Renderizar children si existen */}
        </div>
    );
};
import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types/product';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
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
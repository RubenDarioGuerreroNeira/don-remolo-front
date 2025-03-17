import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Gracias: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirigir al home después de 3 segundos
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        // Limpiar el timer cuando el componente se desmonte
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-primary-dark">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center text-white p-8"
            >
                <motion.h1
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-6xl font-bold mb-4"
                >
                    ¡Gracias por tu compra!
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl md:text-2xl"
                >
                    Nos alegra que hayas elegido nuestros productos
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-4 text-lg"
                >
                    Redirigiendo al inicio...
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Gracias;
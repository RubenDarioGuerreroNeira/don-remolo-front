// src/components/ApiDebug.tsx
import React, { useState } from 'react';

export const ApiDebug: React.FC = () => {
    const [testResponse, setTestResponse] = useState<string>('');

    const testApi = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
            const text = await response.text();
            setTestResponse(text);

            // Intentar parsear como JSON para mejor visualización
            try {
                const json = JSON.parse(text);
                setTestResponse(JSON.stringify(json, null, 2));
            } catch {
                // Si no es JSON válido, mostrar el texto crudo
                setTestResponse(text);
            }
        } catch (err) {
            setTestResponse(`Error: ${err.message}`);
        }
    };

    return import.meta.env.DEV ? (
        <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-md z-50">
            <h3 className="font-bold mb-2">API Debug</h3>
            <div className="mb-2">
                <strong>API URL:</strong> {import.meta.env.VITE_API_URL}
            </div>
            <button
                onClick={testApi}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Test API
            </button>
            {testResponse && (
                <div className="mt-2">
                    <h4 className="font-semibold mb-1">Respuesta:</h4>
                    <pre className="text-xs bg-gray-100 p-2 rounded max-h-60 overflow-auto">
                        {testResponse}
                    </pre>
                </div>
            )}
        </div>
    ) : null;
};
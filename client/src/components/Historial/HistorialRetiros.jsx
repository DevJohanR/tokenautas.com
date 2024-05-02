import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HistorialRetiros = () => {
    const [retiros, setRetiros] = useState([]);
    const [error, setError] = useState(null);

    // Recupera el userId del localStorage
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            setError('El ID del usuario no está definido');
            return;
        }

        const fetchRetiros = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/withdrawals/${userId}`);
                setRetiros(response.data);
                setError(null);  // Limpia cualquier error anterior si la petición es exitosa
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // Establece un mensaje de error específico para el error 404
                    setError('Aquí se verá el historial de tus retiros cuando realices uno.');
                } else {
                    // Manejo de otros errores
                    console.error('Error al obtener el historial de retiros:', error);
                    setError('Error al obtener el historial de retiros.');
                }
            }
        };

        fetchRetiros();
    }, [userId]);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-4">
            <h3 className="font-semibold mb-4 text-xl">Historial de Retiros</h3>
            {retiros.length > 0 ? (
                <ul className="space-y-2">
                    {retiros.map((retiro, index) => (
                        <li key={index} className="border p-2 rounded-md">
                            <p className="font-semibold">Banco: {retiro.banco_id}</p>
                            <p>Monto: ${retiro.valor_retirar}</p>
                            <p>Estado: {retiro.estado}</p>
                            <p>Fecha: {new Date(retiro.fecha_hora).toLocaleDateString()}</p>
                            <p>ID de Transacción: {retiro.identificador_transaccion}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aquí se verá el historial de tus retiros cuando realices uno.</p>
            )}
        </div>
    );
};

export default HistorialRetiros;

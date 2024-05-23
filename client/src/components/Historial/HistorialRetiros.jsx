import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HistorialRetiros = ({ updateHistorial, setUpdateHistorial }) => {
    const [retiros, setRetiros] = useState([]);
    const [error, setError] = useState(null);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            setError('El ID del usuario no está definido');
            return;
        }

        const fetchRetiros = async () => {
            try {
                const response = await axios.get(`https://tokenautasreact-node.onrender.com/withdrawals/${userId}`);
                setRetiros(response.data);
                setError(null);  // Limpia cualquier error anterior si la petición es exitosa
                setUpdateHistorial(false);  // Resetea el estado de actualización
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError('Aquí se verá el historial de tus retiros cuando realices uno.');
                } else {
                    console.error('Error al obtener el historial de retiros:', error);
                    setError('Error al obtener el historial de retiros.');
                }
            }
        };

        fetchRetiros();
    }, [userId, updateHistorial]);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-4 h-96 overflow-y-scroll">
            {retiros.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {retiros.map((retiro, index) => (
                        <li key={index} className="border p-4 rounded-md bg-gray-100 hover:bg-gray-200">
                            <p className="font-semibold text-blue-700">Banco: {retiro.banco_id}</p>
                            <p className="text-green-700">Monto: ${retiro.valor_retirar}</p>
                            <p
                                className={`inline-block px-3 py-1 rounded-full text-white font-semibold ${
                                    retiro.estado === 'pendiente'
                                        ? 'bg-orange-500'
                                        : retiro.estado === 'rechazado'
                                        ? 'bg-red-500'
                                        : 'bg-green-500'
                                }`}
                            >
                                Estado: {retiro.estado}
                            </p>
                            <p className="text-red-700">Fecha: {new Date(retiro.fecha_hora).toLocaleDateString()}</p>
                            <p className="text-purple-700">ID de Transacción: {retiro.identificador_transaccion}</p>
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import HistorialRetiros from '../Historial/HistorialRetiros';

const Retiros = () => {
    const [banks, setBanks] = useState([]);
    const [withdrawalData, setWithdrawalData] = useState({
        user_id: '',
        banco_id: '',
        valor_retirar: '',
        identificador_transaccion: '',
        estado: ''
    });
    const [balance, setBalance] = useState(0);
    const [readOnly, setReadOnly] = useState(false);
    const [transactionIds, setTransactionIds] = useState(new Set());

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            fetchBanks(storedUserId);
            fetchBalance(storedUserId);
            setWithdrawalData(prevState => ({
                ...prevState,
                user_id: storedUserId
            }));
        }
    }, []);

    const fetchBanks = async (userId) => {
        try {
            const response = await axios.get(`https://tokenautasreact-node.onrender.com/users/banks/${userId}`);
            setBanks(response.data);
        } catch (error) {
            console.error('Error al obtener bancos:', error);
        }
    };

    const fetchBalance = async (userId) => {
        try {
            const response = await axios.get(`https://tokenautasreact-node.onrender.com/users/wallet/${userId}`);
            setBalance(parseFloat(response.data.mi_billetera1));
        } catch (error) {
            console.error('Error al obtener balance:', error);
        }
    };

    const handleWithdrawalChange = (e) => {
        setWithdrawalData({ ...withdrawalData, [e.target.name]: e.target.value });
    };

    const preventDuplicateTransaction = () => {
        if (transactionIds.has(withdrawalData.identificador_transaccion)) {
            Swal.fire('Error', 'Identificador de transacción duplicado. No se puede procesar el retiro.', 'error');
            return false;
        }
        transactionIds.add(withdrawalData.identificador_transaccion);
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!preventDuplicateTransaction()) return;

        try {
            const response = await axios.post('https://tokenautasreact-node.onrender.com/users/withdraw', withdrawalData);
            if (response.data.message === 'Retiro procesado con éxito') {
                setBalance(prevBalance => prevBalance - parseFloat(withdrawalData.valor_retirar));
                Swal.fire('Retiro exitoso', `Retiro procesado con éxito. Identificador de la transacción: ${withdrawalData.identificador_transaccion}`, 'success');
            } else {
                Swal.fire('Error', 'Error al procesar el retiro: ' + response.data.message, 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Error al procesar el retiro: ' + (error.response?.data?.message || error.message), 'error');
        }
    };

    const selectBank = (bank) => {
        Swal.fire({
            title: '¿Estás seguro que quieres retirar a este banco?',
            text: `Alias: ${bank.alias}, Nombre del banco: ${bank.nombre_banco}`,
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setWithdrawalData(prevState => ({
                    ...prevState,
                    banco_id: bank.id,
                    identificador_transaccion: uuidv4(),
                    estado: 'pendiente'
                }));
                setReadOnly(false); // Permite editar sólo el valor a retirar
                Swal.fire('Banco seleccionado', `Has seleccionado el banco: ${bank.nombre_banco}. Por favor, completa los detalles del retiro.`, 'success');
            }
        });
    };

    const handleClear = () => {
        setWithdrawalData({
            user_id: withdrawalData.user_id,
            banco_id: '',
            valor_retirar: '',
            identificador_transaccion: '',
            estado: ''
        });
        setReadOnly(false);
    };

    return (
    <div className="w-full h-full bg-gray-900 text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <form onSubmit={handleSubmit} className="space-y-3 col-span-2">
                    <input className="bg-gray-800 appearance-none border-none rounded w-full py-2 px-3 text-lg leading-tight focus:outline-none focus:bg-gray-700" type="text" name="banco_id" value={withdrawalData.banco_id} onChange={handleWithdrawalChange} placeholder="Banco a retirar" required readOnly={true} />
                    <input className="bg-gray-800 appearance-none border-none rounded w-full py-2 px-3 text-lg leading-tight focus:outline-none focus:bg-gray-700" type="text" name="identificador_transaccion" value={withdrawalData.identificador_transaccion} onChange={handleWithdrawalChange} placeholder="Identificador de transacción" required readOnly={true} />
                    <input className="bg-gray-800 appearance-none border-none rounded w-full py-2 px-3 text-lg leading-tight focus:outline-none focus:bg-gray-700" type="text" name="estado" value={withdrawalData.estado} onChange={handleWithdrawalChange} placeholder="Estado" required readOnly={true} />
                    <input className="bg-gray-800 appearance-none border-none rounded w-full py-2 px-3 text-lg leading-tight focus:outline-none focus:bg-gray-700" type="text" name="valor_retirar" value={withdrawalData.valor_retirar} onChange={handleWithdrawalChange} placeholder="Valor a retirar" required />
                    <div className="flex space-x-3">
                        <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Procesar Retiro</button>
                        <button onClick={handleClear} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Borrar</button>
                    </div>
                </form>
                <div className="bg-gray-800 p-3 rounded-lg col-span-1">
                    <h3 className="mb-3 font-semibold">Bancos Registrados</h3>
                    <ul>
                        {banks.map((bank, index) => (
                            <li key={index} className="flex justify-between items-center py-2">
                                <span>{bank.alias} - {bank.nombre_banco} - {bank.tipo_cuenta}</span>
                                <button onClick={() => selectBank(bank)} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">Seleccionar</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="bg-gray-800 mt-6 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-white">Historial de Retiros</h3>
                <HistorialRetiros className="mt-4" />
            </div>
        </div>
    </div>
);

    
};

export default Retiros;

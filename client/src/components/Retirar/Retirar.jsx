import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import HistorialRetiros from '../Historial/HistorialRetiros';
import styles from './Retirar.module.css';

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
    const [updateHistorial, setUpdateHistorial] = useState(false);

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
                Swal.fire({
                    title: 'Retiro exitoso',
                    text: `Retiro procesado con éxito. Identificador de la transacción: ${withdrawalData.identificador_transaccion}`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    setUpdateHistorial(true);  // Marcar que se debe actualizar el historial
                });
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
        <div className={`w-full h-full bg-gray-900 text-white ${styles.contenedorPrincipal}`}>
            <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-8 xl:py-10 ${styles.scrollableContent}`}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4 lg:gap-4">
                    <form onSubmit={handleSubmit} className="space-y-3 md:col-span-2">
                        <input className={`bg-gray-800 appearance-none border-none rounded w-full py-2 px-3 lg:py-3 lg:px-4 xl:py-4 xl:px-5 text-lg leading-tight focus:outline-none focus:bg-gray-700 ${styles['form-input']}`} type="text" name="banco_id" value={withdrawalData.banco_id} onChange={handleWithdrawalChange} placeholder="Banco a retirar" required readOnly={true} />
                        <input className={`bg-gray-800 appearance-none border-none rounded w-full py-2 px-3 lg:py-3 lg:px-4 xl:py-4 xl:px-5 text-lg leading-tight focus:outline-none focus:bg-gray-700 ${styles['form-input']}`} type="text" name="identificador_transaccion" value={withdrawalData.identificador_transaccion} onChange={handleWithdrawalChange} placeholder="Identificador de transacción" required readOnly={true} />
                        <input className={`bg-gray-800 appearance-none border-none rounded w-full py-2 px-3 lg:py-3 lg:px-4 xl:py-4 xl:px-5 text-lg leading-tight focus:outline-none focus:bg-gray-700 ${styles['form-input']}`} type="text" name="estado" value={withdrawalData.estado} onChange={handleWithdrawalChange} placeholder="Estado" required readOnly={true} />
                        <div className="flex space-x-3 items-center">
                            <input className={`flex-grow bg-gray-800 appearance-none border-none rounded py-2 px-3 lg:py-3 lg:px-4 xl:py-4 xl:px-5 text-lg leading-tight focus:outline-none focus:bg-gray-700 ${styles['form-input']}`} type="text" name="valor_retirar" value={withdrawalData.valor_retirar} onChange={handleWithdrawalChange} placeholder="Valor a retirar" required />
                        </div>
                        <div className="flex space-x-3">
                            <button className={`bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 lg:py-3 lg:px-5 xl:py-3 xl:px-6 rounded focus:outline-none focus:shadow-outline ${styles['form-button']}`} type="submit">Procesar Retiro</button>
                            <button onClick={handleClear} className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 lg:py-3 lg:px-5 xl:py-3 xl:px-6 rounded focus:outline-none focus:shadow-outline ${styles['form-button']}`} type="button">Borrar</button>
                        </div>
                    </form>
                    <div className={`bg-gray-800 p-3 lg:p-4 xl:p-5 rounded-lg ${styles['bank-item']} ${styles['bank-container']} md:col-span-1`}>
                        <h3 className={`mb-3 font-semibold lg:text-lg xl:text-xl ${styles['historial-header']}`}>Bancos Registrados</h3>
                        <ul className={`${styles['bank-list']}`}>
                            {banks.map((bank, index) => (
                                <li key={index} className={`flex justify-between items-center py-2 lg:py-2 xl:py-3 ${styles['bank-item']}`}>
                                    <span>{bank.alias} - {bank.nombre_banco} - {bank.tipo_cuenta}</span>
                                    <button onClick={() => selectBank(bank)} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 px-3 lg:py-2 lg:px-4 xl:py-2 xl:px-4 rounded focus:outline-none focus:shadow-outline">Seleccionar</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={`bg-gray-800 mt-6 p-6 lg:mt-8 lg:p-8 xl:mt-10 xl:p-10 rounded-lg shadow-lg ${styles['historial-container']}`}>
                    <h3 className={`text-lg lg:text-xl xl:text-2xl font-semibold text-white ${styles['historial-header']}`}>Historial de Retiros</h3>
                    <HistorialRetiros updateHistorial={updateHistorial} setUpdateHistorial={setUpdateHistorial} className="mt-4 lg:mt-6 xl:mt-8" />
                </div>
            </div>
        </div>
    );
};

export default Retiros;

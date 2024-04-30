import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const RegistrarBancos = () => {
    const [formData, setFormData] = useState({
        user_id: '',
        alias: '',
        nombre_banco: '',
        tipo_cuenta: '',
        titular_cuenta: '',
        cedula_titular: '',
        numeroCuenta: ''
    });
    const [banks, setBanks] = useState([]);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setFormData(prevState => ({ ...prevState, user_id: storedUserId }));
            fetchBanks(storedUserId);
        }
    }, []);

    const fetchBanks = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3001/users/banks/${userId}`);
            setBanks(response.data);
        } catch (error) {
            console.error('Error al obtener bancos:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/users/banks', formData);
            Swal.fire('Registro exitoso', 'Banco registrado con éxito', 'success');
            fetchBanks(formData.user_id);  // Refetch banks after a new one is added
        } catch (error) {
            Swal.fire('Error', 'Error al registrar el banco: ' + (error.response?.data?.message || error.message), 'error');
        }
    };

    const showBankDetails = (bank) => {
        Swal.fire({
            title: 'Detalles del Banco',
            html: `<strong>Alias:</strong> ${bank.alias}<br>
                   <strong>Nombre del banco:</strong> ${bank.nombre_banco}<br>
                   <strong>Tipo de cuenta:</strong> ${bank.tipo_cuenta}<br>
                   <strong>Titular de la cuenta:</strong> ${bank.titular_cuenta}<br>
                   <strong>Cédula del titular:</strong> ${bank.cedula_titular}<br>
                   <strong>Número de cuenta:</strong> ${bank.numeroCuenta}`,
            icon: 'info'
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 bg-gray-800 text-white rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <form onSubmit={handleSubmit} className="space-y-3 col-span-2">
                    <input type="hidden" name="user_id" value={formData.user_id} />
                    <input className="bg-gray-700 appearance-none border-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:bg-gray-600" type="text" name="alias" value={formData.alias} onChange={handleChange} placeholder="Alias" required />
                    <input className="bg-gray-700 appearance-none border-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:bg-gray-600" type="text" name="nombre_banco" value={formData.nombre_banco} onChange={handleChange} placeholder="Nombre del banco" required />
                    <input className="bg-gray-700 appearance-none border-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:bg-gray-600" type="text" name="tipo_cuenta" value={formData.tipo_cuenta} onChange={handleChange} placeholder="Tipo de cuenta" required />
                    <input className="bg-gray-700 appearance-none border-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:bg-gray-600" type="text" name="titular_cuenta" value={formData.titular_cuenta} onChange={handleChange} placeholder="Titular de la cuenta" required />
                    <input className="bg-gray-700 appearance-none border-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:bg-gray-600" type="text" name="cedula_titular" value={formData.cedula_titular} onChange={handleChange} placeholder="Cédula del titular" required />
                    <input className="bg-gray-700 appearance-none border-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:bg-gray-600" type="text" name="numeroCuenta" value={formData.numeroCuenta} onChange={handleChange} placeholder="Número de Cuenta" required />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Registrar Banco</button>
                </form>
                <div className="bg-gray-900 p-3 rounded-lg col-span-1">
                    <h3 className="mb-3 font-semibold">Bancos Registrados</h3>
                    <ul>
                        {banks.map((bank, index) => (
                            <li key={index} className="flex justify-between items-center py-2">
                                <span>{bank.alias} - {bank.nombre_banco} - {bank.tipo_cuenta}</span>
                                <button onClick={() => showBankDetails(bank)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline">Ver</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RegistrarBancos;

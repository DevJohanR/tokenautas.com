import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './RegistrarBancos.module.css'

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
            const response = await axios.get(`https://tokenautasreact-node.onrender.com/users/banks/${userId}`);
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
            const response = await axios.post('https://tokenautasreact-node.onrender.com/users/banks', formData);
            Swal.fire('Registro exitoso', 'Banco registrado con éxito', 'success');
            fetchBanks(formData.user_id);  
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
        <div className="registrarB max-w-7xl mx-auto px- sm:px-6 lg:px-8 py-5 bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden" style={{ maxHeight: '100vh', backgroundColor: '#121026' }}>
          <div className={`${styles.scrollDiv} overflow-auto p-5`} style={{ maxHeight: 'calc(100vh - 4rem)' }}>
          <h1 className="text-3xl mb-6 font-bold underline decoration-white decoration-4">
  Registra aquí los bancos donde recibirás el pago por tus tokens
</h1>


                <form onSubmit={handleSubmit} className="space-y-6 mb-6">
                    <input type="hidden" name="user_id" value={formData.user_id} />
                    <input className="bg-gray-700 appearance-none border-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:bg-gray-600" type="text" name="alias" value={formData.alias} onChange={handleChange} placeholder="Alias" required />
                    <input className="bg-gray-700 appearance-none border-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:bg-gray-600" type="text" name="nombre_banco" value={formData.nombre_banco} onChange={handleChange} placeholder="Nombre del banco" required />
                    <input className="bg-gray-700 appearance-none border-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:bg-gray-600" type="text" name="tipo_cuenta" value={formData.tipo_cuenta} onChange={handleChange} placeholder="Tipo de cuenta" required />
                    <input className="bg-gray-700 appearance-none border-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:bg-gray-600" type="text" name="titular_cuenta" value={formData.titular_cuenta} onChange={handleChange} placeholder="Titular de la cuenta" required />
                    <input className="bg-gray-700 appearance-none border-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:bg-gray-600" type="text" name="cedula_titular" value={formData.cedula_titular} onChange={handleChange} placeholder="Cédula del titular" required />
                    <input className="bg-gray-700 appearance-none border-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:bg-gray-600" type="text" name="numeroCuenta" value={formData.numeroCuenta} onChange={handleChange} placeholder="Número de Cuenta" required />
                    <button className="bg-black-500 hover:bg-pink-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border-2 border-white" type="submit">
  Registrar Banco
</button>

                </form>
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Tus Bancos Registrados</h2>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-auto" style={{ maxHeight: 'calc(100vh - 10rem)' }}>
                        <ul className="space-y-2">
                            {banks.map((bank, index) => (
                                <li key={index} className="flex justify-between items-center p-2 bg-gray-800 rounded-lg">
                                    <span className="font-medium">{bank.alias} - {bank.nombre_banco} - {bank.tipo_cuenta}</span>
                                    <button onClick={() => showBankDetails(bank)} className="bg-black-500 hover:bg-pink-800 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline border-2 border-white">
  Ver
</button>

                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
    
    
    
};

export default RegistrarBancos;

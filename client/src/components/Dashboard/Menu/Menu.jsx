import React, { useEffect } from 'react';
import styles from './Menu.module.css'; // Importa el CSS como un módulo
import Logo from '/logos/coheteLogoBlanco.png';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
    FaDelicious,
    FaShoppingCart,
    FaWallet,
    FaChartLine,
    FaRegClock,
    FaCog,
    FaSignOutAlt,
} from "react-icons/fa";

const Menu = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const mainMenuLi = document
            .getElementById("mainMenu")
            .querySelectorAll("li");

        function changeActive() {
            mainMenuLi.forEach((n) => n.classList.remove(styles.active)); // Usa el estilo como módulo
            this.classList.add(styles.active); // Usa el estilo como módulo
        }

        mainMenuLi.forEach(n => n.addEventListener('click', changeActive))
    }, []);

    const handleWalletClick = () => {
        Swal.fire({
            title: 'Seleccione su moneda',
            background: '#19162c', // Fondo oscuro para combinar con el sitio
            color: '#fff', // Texto blanco para contraste
            confirmButtonColor: '#9f0e6e', // Un color vibrante para el botón de confirmación
            denyButtonColor: '#555', // Un color más tenue para el botón de negación
            showDenyButton: true,
            confirmButtonText: 'Bitcoin',
            denyButtonText: 'Tether',
            customClass: {
                container: 'swal-container', // Clase para el contenedor general
                confirmButton: 'swal-button-confirm', // Clase para el botón de confirmación
                denyButton: 'swal-button-deny' // Clase para el botón de negación
            }
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/bitcoin');
            } else if (result.isDenied) {
                navigate('/tether');
            }
        });
    }

    return (
        <menu className={styles.menu}>
            <img src={Logo} alt="Logo" className={styles.logo} />

            <ul id='mainMenu'>
                <Link to='/dashboard'>
                    <Icon icon={<FaDelicious />} />
                </Link>
                <Link to=''>
                    <Icon icon={<FaShoppingCart />} />
                </Link>
                <Icon icon={<FaWallet />} onClick={handleWalletClick} />

                <Link to="/registrarBancos">
                <Icon icon={<FaChartLine />} />
                </Link>
                <Icon icon={<FaRegClock />} />
                <Icon icon={<FaDelicious />} />
            </ul>

            <ul id='lastMenu'>
                <Icon icon={<FaCog />} />
            </ul>
        </menu>
    );
}

const Icon = ({ icon, onClick }) => (
    <li className={styles.li}>
        <a href="#" className={styles.a} onClick={onClick}> {icon} </a>
    </li>
)

export default Menu;

// Añade estos estilos en tu archivo CSS o dentro de un <style> tag en este mismo archivo para mayor conveniencia.

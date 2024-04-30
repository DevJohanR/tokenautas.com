import React, { useEffect } from 'react';
import styles from './Menu.module.css'; // Importa el CSS como un módulo
import Logo from '/logos/coheteLogoBlanco.png';
import { Link } from 'react-router-dom';

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

    return (
        <menu className={styles.menu}> {/* Aplica la clase usando el módulo */}
       <img src={Logo} alt="Logo" className={styles.logo} />

            <ul id='mainMenu'>
                <Link to='/tether'>
                <Icon icon={<FaDelicious />} />
                </Link>
                <Link to='/bitcoin'>
                <Icon icon={<FaShoppingCart />} />
                </Link>
                <Icon icon={<FaWallet />} />
                <Icon icon={<FaChartLine />} />
                <Icon icon={<FaRegClock />} />
                <Icon icon={<FaDelicious />} />
            </ul>

            <ul id='lastMenu'>
                <Icon icon={<FaCog />} />
            </ul>
        </menu>
    )
}

const Icon = ({ icon }) => (
    <li className={styles.li}> {/* Aplica la clase usando el módulo */}
        <a href="#" className={styles.a}> {icon} </a> {/* Aplica la clase usando el módulo */}
    </li>
)

export default Menu;

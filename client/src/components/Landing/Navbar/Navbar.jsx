import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Asegúrate de que la ruta al archivo CSS sea correcta
import logo from '/logos/coheteLogoBlanco.png';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className={styles.gpt3__navbar}>
      <div className={styles["gpt3__navbar-links"]}>
        <div className={styles["gpt3__navbar-links_logo"]}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles["gpt3__navbar-links_container"]}>
          <p><a href="#home">Home</a></p>
          <p><a href="#wgpt3">Nuestra Empresa</a></p>
          <p><a href="#possibility">Tus Tokens</a></p>
          <p><a href="#features">Clientes</a></p>
          <p><a href="#blog">Tutorial</a></p>
        </div>
      </div>
      <div className={styles["gpt3__navbar-sign"]}>
        <Link to='/login'>
        <p>Ingresar</p>
        </Link>
        <Link to='/register'>
        <button type="button">Registrate</button>
        </Link>
        
        
       
      </div>
      <div className={styles["gpt3__navbar-menu"]}>
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className={styles["gpt3__navbar-menu_container"] + " scale-up-center"}>
            <div className={styles["gpt3__navbar-menu_container-links"]}>
              <p><a href="#home">Home</a></p>
              <p><a href="#wgpt3">Nosotros</a></p>
              <p><a href="#possibility">Tus Tokens</a></p>
              <p><a href="#features">Clientes</a></p>
              <p><a href="#blog">Tutorial</a></p>
            </div>
            <div className={styles["gpt3__navbar-menu_container-links-sign"]}>
            <Link to='/login'>
        <p>Ingresar</p>
        </Link>
        <Link to='/register'>
        <button type="button">Registrate</button>
        </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

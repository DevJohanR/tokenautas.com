import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import styles from './Navbar.module.css'; // Asegúrate de que la ruta al archivo CSS sea correcta
import logo from '/logos/coheteLogoBlanco.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className={styles.gpt3__navbar}>
      <div className={styles["gpt3__navbar-links"]}>
        <div className={styles["gpt3__navbar-links_logo"]}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles["gpt3__navbar-links_container"]}>
          <Link to="/">Home</Link>
          <Link to="/nuestra-empresa">Nuestra Empresa</Link>
          <Link to="/tus-tokens">Tus Tokens</Link>
          <Link to="/clientes">Clientes</Link>
          <Link to="/tutorial">Tutorial</Link>
        </div>
      </div>
      <div className={styles["gpt3__navbar-sign"]}>
        <Link to="/login">Ingresar</Link>
        <Link to="/register"><button type="button">Registrate</button></Link>
      </div>
      <div className={styles["gpt3__navbar-menu"]}>
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className={styles["gpt3__navbar-menu_container"] + " scale-up-center"}>
            <div className={styles["gpt3__navbar-menu_container-links"]}>
              <Link to="/">Home</Link>
              <Link to="/nuestra-empresa">Nuestra Empresa</Link>
              <Link to="/tus-tokens">Tus Tokens</Link>
              <Link to="/clientes">Clientes</Link>
              <Link to="/tutorial">Tutorial</Link>
            </div>
            <div className={styles["gpt3__navbar-menu_container-links-sign"]}>
              <Link to="/login">Ingresar</Link>
              <Link to="/register"><button type="button">Registrate</button></Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

const MostrarBitcoin = forwardRef((props, ref) => {
  const [walletBTC, setWalletBTC] = useState(null);
  const usuarioId = localStorage.getItem('userId'); // Asumiendo que el ID del usuario está almacenado en localStorage

  useEffect(() => {
    const obtenerWalletBTC = async () => {
      try {
        const respuesta = await fetch(`https://tokenautasreact-node.onrender.com/users/wallet/btc/${usuarioId}`);
        const data = await respuesta.json();
        setWalletBTC(data.walletBTC);
      } catch (error) {
        console.error('Error al obtener walletBTC:', error);
      }
    };

    obtenerWalletBTC();
  }, [usuarioId]);

  useImperativeHandle(ref, () => ({
    getWalletBTC: () => walletBTC,
  }));

  return (
    <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
      {walletBTC !== null ? <p>{walletBTC}</p> : <p>Cargando...</p>}
    </div>
  );
});

export default MostrarBitcoin;

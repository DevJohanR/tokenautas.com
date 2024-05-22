import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

const MostrarTether = forwardRef((props, ref) => {
  const [walletUSDT, setWalletUSDT] = useState(null);
  const usuarioId = localStorage.getItem('userId'); // Asumiendo que el ID del usuario está almacenado en localStorage

  useEffect(() => {
    const obtenerWalletUSDT = async () => {
      try {
        const respuesta = await fetch(`https://tokenautasreact-node.onrender.com/users/wallet/usdt/${usuarioId}`);
        const data = await respuesta.json();
        setWalletUSDT(data.walletUSDT);
      } catch (error) {
        console.error('Error al obtener walletUSDT:', error);
      }
    };

    obtenerWalletUSDT();
  }, [usuarioId]);

  useImperativeHandle(ref, () => ({
    getWalletUSDT: () => walletUSDT,
  }));

  return (
    <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
      {walletUSDT !== null ? <p>{walletUSDT}</p> : <p>Cargando...</p>}
    </div>
  );
});

export default MostrarTether;

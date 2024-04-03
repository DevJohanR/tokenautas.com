//server/src/utils/helpers.js
const { arrayusdt, arraybtc } = require('../config/arrays');

async function seleccionarImagenYPalabra($tipo, $pdo) {
  const arraySeleccionado = ($tipo === 'usdt') ? arrayusdt : arraybtc;

  for (const item of arraySeleccionado) {
    const isAssigned = await imagenOPalabraAsignada(item.imagen, item.palabraSecreta, $pdo);
    if (!isAssigned) {
      return [item.imagen, item.palabraSecreta];
    }
  }

  return [null, null];
}

function imagenOPalabraAsignada($imagen, $palabraSecreta, $pdo) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT COUNT(*)
      FROM usuarios
      WHERE imagenusdt = ? OR imagenbtc = ? OR walletUSDT = ? OR walletBTC = ?
    `;

    $pdo.query(sql, [$imagen, $imagen, $palabraSecreta, $palabraSecreta], (err, result) => {
      if (err) reject(err);
      const count = result[0]['COUNT(*)'];
      resolve(count > 0);
    });
  });
}

module.exports = {
  seleccionarImagenYPalabra,
};

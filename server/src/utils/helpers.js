// Importamos los arrays que contienen las imágenes y las palabras secretas
const { arrayusdt, arraybtc } = require('../config/arrays');

// Función asíncrona para seleccionar una imagen y palabra secreta no asignadas previamente
async function seleccionarImagenYPalabra(tipo, pool) {
  // Determinamos qué array usar basado en el tipo de moneda
  const arraySeleccionado = (tipo === 'usdt') ? arrayusdt : arraybtc;

  // Iteramos sobre el array seleccionado para encontrar una imagen y palabra no asignadas
  for (const item of arraySeleccionado) {
    const isAssigned = await imagenOPalabraAsignada(item.imagen, item.palabraSecreta, pool);
    if (!isAssigned) {
      return [item.imagen, item.palabraSecreta];
    }
  }

  // Si todas están asignadas, retornamos null para ambos valores
  return [null, null];
}

// Función para verificar si una imagen y palabra secreta ya están asignadas
async function imagenOPalabraAsignada(imagen, palabraSecreta, pool) {
  // Consulta SQL para verificar la asignación de la imagen o la palabra
  const sql = `
    SELECT COUNT(*)
    FROM usuarios
    WHERE imagenusdt = ? OR imagenbtc = ? OR walletUSDT = ? OR walletBTC = ?
  `;

  // Ejecutamos la consulta utilizando el pool de conexiones
  try {
    const [result] = await pool.query(sql, [imagen, imagen, palabraSecreta, palabraSecreta]);
    const count = result[0]['COUNT(*)'];
    return count > 0;
  } catch (err) {
    console.error('Error en la consulta:', err);
    throw err;  // Propagamos el error para que pueda ser manejado por la función llamadora
  }
}

// Exportamos las funciones para que puedan ser utilizadas en otros archivos
module.exports = {
  seleccionarImagenYPalabra,
  imagenOPalabraAsignada
};

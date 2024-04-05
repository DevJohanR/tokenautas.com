//server/src/controllers/userController.js
const db = require('../config/database');
const uuid = require('uuid');

const { seleccionarImagenYPalabra } = require('../utils/helpers.js');



const login = (req, res, next) => {
  const { username, password } = req.body;
  const userQuery = 'SELECT * FROM usuarios WHERE username = ?';

  db.query(userQuery, [username], (err, users) => {
    if (err) {
      return next(err);
    }

    if (users.length > 0) {
      const user = users[0];
      // Aquí deberías comparar la contraseña con hash usando bcrypt si fuera un entorno de producción


      if (password === user.password) {
        // Envía una respuesta JSON con un mensaje y el username
        res.json({ message: 'Login exitoso', username: user.username }); // Ajusta según la estructura de tu objeto 'user'
      } else {
        // Envía una respuesta JSON con un mensaje de error
        res.status(401).json({ message: 'Credenciales incorrectas' });
      }
      


    } else {
      res.status(401).send('Usuario no encontrado');
    }
  });
};





const registerUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Seleccionar imagen y palabra secreta aleatoria para cada tipo
    const [imagenUsdt, palabraSecretaUsdt] = await seleccionarImagenYPalabra('usdt', db);
    const [imagenBtc, palabraSecretaBtc] = await seleccionarImagenYPalabra('btc', db);

    // Verificar si se obtuvieron imagen y palabra secreta
    if (!imagenUsdt || !palabraSecretaUsdt || !imagenBtc || !palabraSecretaBtc) {
      throw new Error('No se pudo obtener la imagen y palabra secreta para las billeteras');
    }

    // Generar la consulta SQL para registrar al usuario junto con las billeteras
    const sqlUsuario = `
      INSERT INTO usuarios (username, password, walletUSDT, walletBTC, imagenusdt, imagenbtc)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    // Registrar al usuario en la base de datos
    await db.promise().query(sqlUsuario, [username, password, palabraSecretaUsdt, palabraSecretaBtc, imagenUsdt, imagenBtc]);

    res.status(201).send('Usuario registrado exitosamente');
  } catch (err) {
    // Manejar errores aquí
    next(err);
  }
};











const getUserDetails = (req, res, next) => {
  // Agrega aquí tu lógica para obtener detalles del usuario
};

const updateUserPassword = (req, res, next) => {
  // Agrega aquí tu lógica para actualizar la contraseña del usuario
};

module.exports = {
  login,
  registerUser,
  getUserDetails,
  updateUserPassword
};

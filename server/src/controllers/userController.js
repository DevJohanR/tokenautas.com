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

      if (password === user.password) {
        // Asegúrate de incluir el user_id en la respuesta
        res.json({ message: 'Login exitoso', username: user.username, userId: user.user_id });
      } else {
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











const getUserImagenUSDT = (req, res, next) => {
  const { userId } = req.params; // Asegúrate de que 'userId' coincide con el parámetro que defines en tu ruta
  const userDetailsQuery = 'SELECT username, imagenusdt FROM usuarios WHERE user_id = ?';

  db.query(userDetailsQuery, [userId], (err, result) => {
    if (err) {
      return next(err);
    }

    if (result.length > 0) {
      const { username, imagenusdt } = result[0];
      res.json({ username, imagenusdt });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });
};



const getUserImagenBTC = (req, res, next) => {
  const { userId } = req.params;
  const userDetailsQuery = 'SELECT username, imagenbtc FROM usuarios WHERE user_id = ?';

  db.query(userDetailsQuery, [userId], (err, result) => {
    if (err) {
      return next(err);
    }

    if (result.length > 0) {
      const { username, imagenbtc } = result[0];
      res.json({ username, imagenbtc });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });
};


const updateUserPassword = (req, res, next) => {
  // Agrega aquí tu lógica para actualizar la contraseña del usuario
};

module.exports = {
  login,
  registerUser,
  getUserImagenUSDT,
  getUserImagenBTC, 
  updateUserPassword
};

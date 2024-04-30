//server/src/controllers/userController.js
const pool = require('../config/database');

const { seleccionarImagenYPalabra } = require('../utils/helpers.js');


//LOGIN
const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const [users] = await pool.query('SELECT * FROM usuarios WHERE username = ?', [username]);
    if (users.length > 0) {
      const user = users[0];
      if (password === user.password) {
        res.json({ message: 'Login exitoso', username: user.username, userId: user.user_id });
      } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    } else {
      res.status(401).send('Usuario no encontrado');
    }
  } catch (err) {
    next(err);
  }
};
//



//REGISTER//
const registerUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Seleccionar imagen y palabra secreta aleatoria para cada tipo
    const [imagenUsdt, palabraSecretaUsdt] = await seleccionarImagenYPalabra('usdt', pool);
    const [imagenBtc, palabraSecretaBtc] = await seleccionarImagenYPalabra('btc', pool);

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
    await pool.query(sqlUsuario, [username, password, palabraSecretaUsdt, palabraSecretaBtc, imagenUsdt, imagenBtc]);

    // Enviar respuesta de éxito
    res.status(201).send('Usuario registrado exitosamente');
  } catch (err) {
    // Manejar errores aquí
    console.error('Error al registrar usuario:', err);
    res.status(500).send('Error al registrar el usuario');
    next(err);
  }
};


//BTC-USDT
const getUserImagenUSDT = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const [result] = await pool.query('SELECT username, imagenusdt FROM usuarios WHERE user_id = ?', [userId]);
    if (result.length > 0) {
      const { username, imagenusdt } = result[0];
      res.json({ username, imagenusdt });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (err) {
    next(err);
  }
};




const getUserImagenBTC = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const [result] = await pool.query('SELECT username, imagenbtc FROM usuarios WHERE user_id = ?', [userId]);
    if (result.length > 0) {
      const { username, imagenbtc } = result[0];
      res.json({ username, imagenbtc });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (err) {
    next(err);
  }
};



const getUsername = async (req, res, next) => {
  try {
    const userId = req.params.userId; // Obtienes el ID del usuario
    const queryText = 'SELECT username FROM usuarios WHERE user_id = ?';
    const queryValues = [userId];
    
    
    const [result] = await pool.query(queryText, queryValues);
    
    if (result.length > 0) {
      res.json({ username: result[0].username });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    next(error); // Pasar los errores al manejador de errores de Express
  }
};



const updateUserPassword = (req, res, next) => {
  // Agrega aquí tu lógica para actualizar la contr
};

module.exports = {
  login,
  registerUser,
  getUserImagenUSDT,
  getUserImagenBTC, 
  updateUserPassword,
  getUsername
};

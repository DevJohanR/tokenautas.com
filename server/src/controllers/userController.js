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


//USDT
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



//BTC
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


// Controlador para obtener el valor de mi_billetera1
const getWalletBalance = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const queryText = 'SELECT mi_billetera1 FROM usuarios WHERE user_id = ?';
    const [result] = await pool.query(queryText, [userId]);
    
    if (result.length > 0) {
      let balance = result[0].mi_billetera1;
      
      // Si balance es null o vacío, lo establecemos en 0
      balance = balance || 0;

      // Formateamos el balance para añadir puntos como separadores de miles
      const formattedBalance = new Intl.NumberFormat('es-ES').format(balance);
      
      res.json({ mi_billetera1: formattedBalance });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    next(error);
  }
};


const addBank = async (req, res) => {
  const { user_id, alias, nombre_banco, tipo_cuenta, titular_cuenta, cedula_titular, numeroCuenta } = req.body;
  console.log("Recibido para insertar:", req.body);  // Añade esta línea para verificar la entrada
  try {
      const [result] = await pool.query('INSERT INTO bancos_usuarios (user_id, alias, nombre_banco, tipo_cuenta, titular_cuenta, cedula_titular, numeroCuenta) VALUES (?, ?, ?, ?, ?, ?, ?)', [user_id, alias, nombre_banco, tipo_cuenta, titular_cuenta, cedula_titular, numeroCuenta]);
      res.status(201).send({ message: 'Banco registrado con éxito', bankId: result.insertId });
  } catch (error) {
      console.error('Error al registrar banco:', error);
      res.status(500).send({ message: 'Error al registrar banco', error: error.message });
  }
};


const getBanksByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
      const [banks] = await pool.query('SELECT * FROM bancos_usuarios WHERE user_id = ?', [userId]);
      res.status(200).json(banks);
  } catch (error) {
      console.error('Error al obtener bancos:', error);
      res.status(500).send({ message: 'Error al obtener bancos' });
  }
};




const getUserIdByUsername = async (req, res, next) => {
  const { username } = req.params;
  try {
      const [result] = await pool.query('SELECT user_id FROM usuarios WHERE username = ?', [username]);
      if (result.length > 0) {
          res.json({ user_id: result[0].user_id });
      } else {
          res.status(404).json({ message: 'Usuario no encontrado' });
      }
  } catch (error) {
      console.error('Error al obtener user_id:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
      next(error);
  }
};



const processWithdrawal = async (req, res, next) => {
  const { user_id, banco_id, valor_retirar, identificador_transaccion, estado } = req.body;
  
  
  const amountToWithdraw = parseFloat(valor_retirar);

  try {
    
    const [users] = await pool.query('SELECT mi_billetera1 FROM usuarios WHERE user_id = ?', [user_id]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    
    const currentBalance = parseFloat(users[0].mi_billetera1);

  
    if (currentBalance < amountToWithdraw) {
      return res.status(400).json({ message: 'Saldo insuficiente' });
    }

    
    const newBalance = currentBalance - amountToWithdraw;

    
    await pool.query('START TRANSACTION');

  
    const queryText = 'INSERT INTO retiros (user_id, banco_id, valor_retirar, identificador_transaccion, estado) VALUES (?, ?, ?, ?, ?)';
    await pool.query(queryText, [user_id, banco_id, valor_retirar, identificador_transaccion, estado]);

    
    await pool.query('UPDATE usuarios SET mi_billetera1 = ? WHERE user_id = ?', [newBalance, user_id]);

  
    await pool.query('COMMIT');

    res.json({ message: 'Retiro procesado con éxito' });
  } catch (error) {
    
    await pool.query('ROLLBACK');
    console.error('Error al procesar el retiro:', error);
    res.status(500).json({ message: 'Error al procesar el retiro' });
  }
};



const getWithdrawalsByUserId = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
      return res.status(400).json({ message: 'El parámetro userId es requerido' });
  }

  try {
      const [withdrawals] = await pool.query('SELECT * FROM retiros WHERE user_id = ?', [userId]);
      if (!withdrawals.length) {
          return res.status(404).json({ message: 'No se encontraron retiros para el usuario proporcionado' });
      }

      return res.status(200).json(withdrawals);
  } catch (error) {
      console.error('Error al obtener el historial de retiros:', error);
      return res.status(500).json({ message: 'Error al obtener el historial de retiros', error: error.message });
  }
};




//dev7777
// Obtener walletUSDT
const obtenerWalletUSDT = async (req, res, next) => {
  const usuarioId = req.params.usuarioId;
  try {
    const [resultado] = await pool.query('SELECT walletUSDT FROM usuarios WHERE user_id = ?', [usuarioId]);
    if (resultado.length > 0) {
      const { walletUSDT } = resultado[0];
      res.json({ walletUSDT });
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (err) {
    next(err);
  }
};

// Obtener walletBTC
const obtenerWalletBTC = async (req, res, next) => {
  const usuarioId = req.params.usuarioId;
  try {
    const [resultado] = await pool.query('SELECT walletBTC FROM usuarios WHERE user_id = ?', [usuarioId]);
    if (resultado.length > 0) {
      const { walletBTC } = resultado[0];
      res.json({ walletBTC });
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (err) {
    next(err);
  }
};







const updateUserPassword = (req, res, next) => {
  // Agrega aquí tu lógica para actualizar la contr
};

module.exports = {
  obtenerWalletUSDT,
  obtenerWalletBTC,
  login,
  registerUser,
  getUserImagenUSDT,
  getUserImagenBTC, 
  updateUserPassword,
  getUsername,
  getWalletBalance,
  addBank,
    getBanksByUserId,
    getUserIdByUsername,
    processWithdrawal,
    getWithdrawalsByUserId
};

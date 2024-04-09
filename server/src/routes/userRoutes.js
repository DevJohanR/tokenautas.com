//server/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { login, registerUser, getUserImagenUSDT, getUserImagenBTC, updateUserPassword } = require('../controllers/userController');

router.post('/login', login);
router.post('/register', registerUser);

router.get('/:userId', getUserImagenUSDT);
router.get('/btc/:userId', getUserImagenBTC);
router.put('/updatePassword', updateUserPassword);

// Esta línea ha sido eliminada, ya que la configuración de archivos estáticos se ha movido a index.js
// router.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

module.exports = router;

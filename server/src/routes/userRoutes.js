//server/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { obtenerWalletUSDT,
    obtenerWalletBTC, login, registerUser, getUserImagenUSDT, getUserImagenBTC, updateUserPassword, getUsername, getWalletBalance,  addBank, getBanksByUserId, getUserIdByUsername, processWithdrawal,} = require('../controllers/userController');

router.post('/login', login);
router.post('/register', registerUser);

/* START RUTAS PARA RENDERIZAR IMAGENES */
router.get('/:userId', getUserImagenUSDT);
router.get('/:userId', getUserImagenBTC);
router.get('/tether/:userId', getUserImagenUSDT);
router.get('/btc/:userId',  getUserImagenBTC);
/* END RUTAS PARA RENDERIZAR IMAGENES */

router.get('/username/:userId', getUsername);
router.get('/wallet/:userId', getWalletBalance);
router.put('/updatePassword', updateUserPassword);


router.post('/banks', addBank);
router.get('/banks/:userId', getBanksByUserId);


router.get('/get-user-id/:username', getUserIdByUsername);

router.post('/withdraw', processWithdrawal);

//dev7777
router.get('/wallet/usdt/:usuarioId', obtenerWalletUSDT);
router.get('/wallet/btc/:usuarioId', obtenerWalletBTC);






// Esta línea ha sido eliminada, ya que la configuración de archivos estáticos se ha movido a index.js
// router.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

module.exports = router;

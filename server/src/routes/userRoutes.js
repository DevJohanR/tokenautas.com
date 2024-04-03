//server/src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { login, registerUser, getUserDetails, updateUserPassword } = require('../controllers/userController');


router.post('/login', login);
router.post('/register', registerUser);

router.get('/:userId', getUserDetails);
router.put('/updatePassword', updateUserPassword);

module.exports = router;

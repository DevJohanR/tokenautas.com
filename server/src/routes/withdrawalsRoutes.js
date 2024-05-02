const express = require('express');
const router = express.Router();
const { getWithdrawalsByUserId } = require('../controllers/userController');

router.get('/:userId', getWithdrawalsByUserId);

module.exports = router;

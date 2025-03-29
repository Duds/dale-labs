const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

router.get('/:userId', authenticate, userController.getUser);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;

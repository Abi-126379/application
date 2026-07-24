// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { register, login, listUsers } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/', listUsers);

module.exports = router;

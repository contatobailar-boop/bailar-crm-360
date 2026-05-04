const express = require('express');
const { authenticate } = require('../middlewares/auth');
const ctrl = require('../controllers/authController');
const router = express.Router();

// POST /api/auth/login     — público
router.post('/login', ctrl.login);

// GET  /api/auth/me         — autenticado
router.get('/me', authenticate, ctrl.me);

module.exports = router;

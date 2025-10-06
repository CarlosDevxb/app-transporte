const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/user/profile
// @desc    Obtener los datos del perfil del usuario (nombre y saldo)
// @access  Privado (requiere token)
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    // El ID del usuario se obtiene del token gracias al middleware
    const userId = req.user.userId;

    // Consulta para obtener el nombre del usuario y el saldo de su tarjeta
    const query = `
      SELECT u.name, u.curp, u.card_type, c.balance
      FROM users u
      LEFT JOIN cards c ON u.user_id = c.user_id
      WHERE u.user_id = $1;
    `;
    const { rows } = await db.query(query, [userId]);

    res.json(rows[0] || { name: req.user.name, curp: null, card_type: null, balance: null });
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});

module.exports = router;
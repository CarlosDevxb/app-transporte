const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // 1. Validar que el email y la contraseña no estén vacíos
  if (!email || !password) {
    return res.status(400).json({ message: 'El correo y la contraseña son requeridos.' });
  }

  try {
    // 2. Buscar al usuario en la base de datos por su email
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userResult.rows.length === 0) {
      // Si no se encuentra el usuario, enviamos un error 401 (No autorizado)
      // Usamos un mensaje genérico por seguridad, para no revelar si el email existe o no.
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const user = userResult.rows[0];

    // 3. Comparar la contraseña enviada con el hash almacenado
    const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordCorrect) {
      // Si la contraseña es incorrecta, enviamos el mismo error genérico.
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // 4. Si todo es correcto, crear un token JWT
    const payload = {
      userId: user.user_id,
      name: user.name,
    };

    // Firmamos el token con un secreto (¡debe estar en .env!) y una expiración
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // 5. Enviar el token al cliente
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});

module.exports = router;


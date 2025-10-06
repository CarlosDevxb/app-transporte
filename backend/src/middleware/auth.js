const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const authHeader = req.header('Authorization');

  // Verificar si no hay token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No hay token o el formato es inválido, autorización denegada.' });
  }

  try {
    // Extraer el token del formato "Bearer <token>"
    const token = authHeader.split(' ')[1];

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Añadir el payload del token (que contiene los datos del usuario) al objeto request
    req.user = decoded;
    next(); // Pasar al siguiente middleware o a la ruta
  } catch (err) {
    res.status(401).json({ message: 'El token no es válido.' });
  }
};

module.exports = authMiddleware;
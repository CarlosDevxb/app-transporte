require('dotenv').config(); // Carga las variables de entorno desde .env

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite solicitudes desde el frontend
app.use(express.json()); // Para parsear el body de las solicitudes como JSON

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('API de CuchipuGo funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
const { Pool } = require('pg');


// Crea un objeto de configuración explícito usando las variables de entorno
// que definiste en tu archivo .env (DB_USER, DB_HOST, etc.)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

// Opcional: para verificar que la conexión es exitosa al iniciar
pool.connect().then(() => console.log('Conectado a la base de datos PostgreSQL'));

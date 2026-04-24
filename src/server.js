// 1. Cargar variables de entorno (SIEMPRE primero)
require('dotenv').config();

// 2. Importaciones
const express = require('express');
const cors = require('cors');

// 3. Rutas
const authRoutes = require('./routes/auth.routes');
const itemRoutes = require('./routes/item.routes');
const userRoutes = require('./routes/user.routes');

// 4. Conexión a base de datos
require('./config/db');

// 5. Inicializar app
const app = express();

// 6. Middlewares globales
app.use(cors());
app.use(express.json());

// 7. Ruta base (test)
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando 🚀 en modo online' });
});

// 8. Rutas del sistema
app.use('/', authRoutes);
app.use('/', itemRoutes);
app.use('/', userRoutes);

// 9. Puerto
const PORT = process.env.PORT || 3000;

//9.1 Manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Error interno del servidor"
  });
});

// 10. Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Modo: ${process.env.NODE_ENV || 'development'}`);
});
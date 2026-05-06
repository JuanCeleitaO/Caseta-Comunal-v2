const express = require('express');
const cors = require('cors');
const path = require('path');
const conflictRoutes = require('./routes/conflict.routes');
require('dotenv').config();

const connectMongo = require('./config/mongodb.config');
// La conexión de Postgres se maneja mediante el pool según se necesite

const app = express();

// Middlewares iniciales
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'))); // Sirve las imágenes subidas

app.use('/api/conflictos', conflictRoutes);

// Inicializar conexiones
connectMongo();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor de la Caseta Comunal corriendo en el puerto ${PORT}`);
});

module.exports = app;
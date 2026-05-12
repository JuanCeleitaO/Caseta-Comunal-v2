const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express(); // ÚNICA DECLARACIÓN

// Conexión a MongoDB
const connectMongo = require('./config/mongodb.config');
const reporteController = require('./controllers/reporte.controller');

//  Middlewares
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

//Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    servicio: 'caseta-comunal',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/reportes', require('./routes/reporte.routes'));

// Inicializar a mongoBD
connectMongo();
const PORT = process.env.PORT || 3004;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor de la Caseta Comunal corriendo en el puerto ${PORT}`);
});
module.exports = app;
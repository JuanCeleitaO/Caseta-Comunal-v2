const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Conexión a MongoDB
const connectMongo = require("./config/mongodb.config");

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la ruta correcta
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// Endpoint de salud obligatorio
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    servicio: "caseta-comunal",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Rutas
app.use("/reportes", require("./routes/reporte.routes"));

// Inicializar base de datos y levantar servidor
connectMongo();
const PORT = process.env.PORT || 3004;

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `✅ Servidor de la Caseta Comunal corriendo en el puerto ${PORT}`,
  );
});

module.exports = app;

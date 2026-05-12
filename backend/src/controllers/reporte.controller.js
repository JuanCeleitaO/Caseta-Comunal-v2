const Reporte = require('../models/reporte.model'); 

// GET /health
const healthCheck = (req, res) => {
  res.status(200).json({
    status: 'ok',
    servicio: 'caseta-comunal',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
};

const crearReporte = async (req, res) => {
  try {
    const { titulo, descripcion, autor_nombre } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'La foto es obligatoria' });
    }

    const foto_url = `/uploads/${req.file.filename}`;

    const nuevoReporte = new Reporte({
      titulo,
      descripcion,
      autor_nombre,
      foto_url,
      estado: 'pendiente' 
    });

    await nuevoReporte.save();

    res.status(201).json({
      mensaje: "Reporte creado exitosamente",
      reporte: nuevoReporte
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el reporte', detalle: error.message });
  }
};

const listar = async (req, res) => {
  try {
    const { estado } = req.query;
    const filtro = estado ? { estado } : {};

    const reportes = await Reporte.find(filtro).sort({ creado_en: -1 });
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reportes' });
  }
};

const cambiarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
//middleware debe estar activo 
    const reporte = await Reporte.findByIdAndUpdate(
      id,
      { 
        estado, 
        actualizado_por: req.usuario ? req.usuario.id : null 
      },
      { new: true }
    );

    if (!reporte) return res.status(404).json({ error: 'Reporte no encontrado' });

    res.json({ mensaje: 'Estado actualizado', estado: reporte.estado });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar estado' });
  }
};
//exportacion de los datos
module.exports = {
  healthCheck,
  crearReporte, 
  listar,
  cambiarEstado
};
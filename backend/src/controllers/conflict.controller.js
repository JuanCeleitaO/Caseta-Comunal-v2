const Conflict = require('../models/conflict.model'); // Se asume que el modelo está en models/

const crearReporte = async (req, res) => {
  try {
    const { autor, titulo, descripcion } = req.body;
    
    // Si no hay archivo, Multer deja req.file vacío
    //req.file =archivo subido
    const imagenUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const nuevoConflicto = new Conflict({
      autor,
      titulo,
      descripcion,
      imagenUrl
    });

    await nuevoConflicto.save();
    res.status(201).json({ message: 'Reporte comunitario guardado con éxito', nuevoConflicto });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar el reporte', error: error.message });
  }
};

module.exports = { crearReporte };
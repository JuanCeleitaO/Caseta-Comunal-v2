const Reporte = require("../models/reporte.model");

const healthCheck = (req, res) => {
  res.json({ status: "ok", modulo: "reportes" });
};

const crearReporte = async (req, res) => {
  try {
    const { autor_nombre, titulo, descripcion } = req.body;

    if (!autor_nombre || !titulo) {
      return res
        .status(400)
        .json({ error: "Nombre de autor y título son obligatorios" });
    }

    let foto_url = "";
    if (req.file) {
      // Guarda la ruta relativa para el frontend (/uploads/nombre-archivo.jpg)
      foto_url = `/uploads/${req.file.filename}`;
    }

    const nuevoReporte = new Reporte({
      autor_nombre,
      titulo,
      descripcion,
      foto_url,
      estado: "pendiente",
    });

    await nuevoReporte.save();
    res.status(201).json(nuevoReporte);
  } catch (error) {
    console.error("Error al crear reporte:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor al guardar el reporte" });
  }
};

const listar = async (req, res) => {
  try {
    const { estado } = req.query;
    const filtro = estado ? { estado } : {};

    const reportes = await Reporte.find(filtro).sort({ fecha_creacion: -1 });
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la lista de reportes" });
  }
};

const cambiarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const estadosValidos = ["pendiente", "en_revision", "solucionado"];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ error: "Estado no válido" });
    }

    const reporteActualizado = await Reporte.findByIdAndUpdate(
      id,
      { estado },
      { new: true },
    );

    if (!reporteActualizado) {
      return res.status(404).json({ error: "Reporte no encontrado" });
    }

    res.json(reporteActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el estado" });
  }
};

const eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const reporteEliminado = await Reporte.findByIdAndDelete(id);

    if (!reporteEliminado) {
      return res.status(404).json({ error: "Reporte no encontrado" });
    }

    res.json({ mensaje: "Reporte eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el reporte" });
  }
};

module.exports = {
  healthCheck,
  crearReporte,
  listar,
  cambiarEstado,
  eliminar,
};

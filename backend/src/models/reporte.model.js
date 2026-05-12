const mongoose = require('mongoose');

const ReporteSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  autor_nombre: { type: String, required: true }, 
  foto_url: { type: String, required: true },
  estado: { 
    type: String, 
    enum: ['pendiente', 'en_revision', 'solucionado'], 
    default: 'pendiente' 
  },
  actualizado_por: { type: String, default: null } // ID del admin/moderador
}, { 
  timestamps: { createdAt: 'creado_en', updatedAt: 'actualizado_en' } 
});

module.exports = mongoose.model('Reporte', ReporteSchema);
const mongoose = require('mongoose');

const ConflictSchema = new mongoose.Schema({
  // Nombre de quien reporta
  autor: {
    type: String,
    required: [true, 'El nombre es necesario para el reporte'],
    trim: true
  },
  // Título corto de la problemática 
  titulo: {
    type: String, //Hay un tubo roto frente a la casa de doña Francy
    required: true
  },
  // Descripción opcional
  descripcion: {
    type: String, //es un tubo de 1 metro // no es necesario de escribir para el reporte de la problematica
    default: 'Sin descripción adicional'
  },
  // URL o ruta de la foto tomada por el integrante
  imagenUrl: {
    type: String,
    required: [true, 'La foto es vital para que la comunidad vea el problema']
  },
  // Estado visual para la comunidad 
  estado: {
    type: String,
    enum: ['pendiente', 'en revision', 'solucionado'],
    default: 'pendiente'
  },
  fechaReporte: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Conflict', ConflictSchema);
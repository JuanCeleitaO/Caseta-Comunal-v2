const express = require('express');
const router = express.Router();
const upload = require('../utils/multer.config');
const { crearReporte } = require('../controllers/conflict.controller');

// Ruta: POST /api/conflictos
router.post('/', upload.single('imagen'), crearReporte);

module.exports = router;
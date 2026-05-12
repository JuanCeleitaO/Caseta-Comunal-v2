const express = require('express');
const router = express.Router();
const upload = require('../config/multer');

const { crearReporte } = require('../controllers/reporte.controller');


router.post('/', upload.single('imagen'), crearReporte);

module.exports = router;
const multer = require('multer');
const path = require('path');

// almacenamiento físico
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); //ubicacion de las fotos
  },
  filename: (req, file, cb) => {
    // Nombre: fecha-nombreoriginal.jpg
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });
module.exports = upload;
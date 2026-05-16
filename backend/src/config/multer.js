const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Apuntamos directamente a la carpeta 'uploads' en la raíz del backend (como pide Docker)
const uploadDir = path.join(__dirname, "../../uploads");

// Creamos la carpeta si no existe para que no arroje errores
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Reemplazamos los espacios del nombre del archivo por guiones para evitar URLs rotas
    const nombreLimpio = file.originalname.replace(/\s+/g, "-");
    cb(null, Date.now() + "-" + nombreLimpio);
  },
});

const upload = multer({ storage });
module.exports = upload;

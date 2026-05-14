
const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const {
  crearReporte,
  listar,
  cambiarEstado,
  eliminarReporte,
} = require("../controllers/reporte.controller");
const {
  verificarToken,
  requiereRol,
} = require("../middleware/auth.middleware");


router.get("/", listar);
router.get("/:id", async (req, res) => {
  const Reporte = require("../models/reporte.model");
  try {
    const reporte = await Reporte.findById(req.params.id);
    if (!reporte) return res.status(404).json({ error: "No encontrado" });
    res.json(reporte);
  } catch (e) {
    res.status(500).json({ error: "Error al buscar reporte" });
  }
});

router.post("/", upload.single("foto"), crearReporte);


router.put(
  "/:id/estado",
  verificarToken,
  requiereRol("moderador"),
  cambiarEstado,
);
router.delete(
  "/:id",
  verificarToken,
  requiereRol("admin"),
  async (req, res) => {
    const Reporte = require("../models/reporte.model");
    try {
      const reporte = await Reporte.findByIdAndDelete(req.params.id);
      if (!reporte) return res.status(404).json({ error: "No encontrado" });
      res.json({ mensaje: "Reporte eliminado" });
    } catch (e) {
      res.status(500).json({ error: "Error al eliminar" });
    }
  },
);

module.exports = router;

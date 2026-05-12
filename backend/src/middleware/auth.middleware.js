const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token requerido" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}

function requiereRol(...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.usuario) return res.status(401).json({ error: "No autenticado" });
    const esAdmin = req.usuario.rol === "admin";
    const esModerador =
      req.usuario.rol === "moderador" &&
      req.usuario.modulo === "caseta-comunal";
    const tienePermiso = rolesPermitidos.some((r) => {
      if (r === "admin") return esAdmin;
      if (r === "moderador") return esModerador || esAdmin;
      return false;
    });
    if (!tienePermiso) return res.status(403).json({ error: "Sin permisos" });
    next();
  };
}

module.exports = { verificarToken, requiereRol };

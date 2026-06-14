let logs = [];

const getLogs = (req, res) => {
  res.status(200).json({
    ok: true,
    message: "Logs obtenidos correctamente",
    data: logs
  });
};

const createLog = (req, res) => {
  const { usuario, ip, accion } = req.body;

  if (!usuario || !accion) {
    return res.status(400).json({
      ok: false,
      message: "Los campos usuario y accion son obligatorios"
    });
  }

  const nuevoLog = {
    id: logs.length + 1,
    usuario,
    ip: ip || req.ip || "IP no detectada",
    accion,
    fecha: new Date().toISOString()
  };

  logs.push(nuevoLog);

  res.status(201).json({
    ok: true,
    message: "Log registrado correctamente",
    data: nuevoLog
  });
};

module.exports = {
  getLogs,
  createLog
};

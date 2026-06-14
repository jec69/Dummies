const crypto = require("crypto");

const usuarios = [
  {
    correo: "admin@test.com",
    password: "123456",
    resetToken: null
  }
];

const login = (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({
      mensaje: "Correo y password son obligatorios"
    });
  }

  const usuario = usuarios.find(
    (item) => item.correo === correo && item.password === password
  );

  if (usuario) {
    return res.status(200).json({
      mensaje: "Login exitoso",
      usuario: {
        correo: usuario.correo
      }
    });
  }

  return res.status(401).json({
    mensaje: "Credenciales incorrectas"
  });
};

const logout = (req, res) => {
  return res.status(200).json({
    mensaje: "Logout exitoso"
  });
};

const forgotPassword = (req, res) => {
  const { correo } = req.body;

  if (!correo) {
    return res.status(400).json({
      mensaje: "El correo es obligatorio"
    });
  }

  const usuario = usuarios.find((item) => item.correo === correo);

  if (!usuario) {
    return res.status(404).json({
      mensaje: "Usuario no encontrado"
    });
  }

  const token = crypto.randomBytes(20).toString("hex");
  usuario.resetToken = token;

  console.log("=== SIMULACION DE CORREO ===");
  console.log(`Para: ${correo}`);
  console.log(`Token de recuperación: ${token}`);
  console.log("============================");

  return res.status(200).json({
    mensaje: "Token generado correctamente. Revisar consola del servidor.",
    tokenSimulado: token
  });
};

const resetPassword = (req, res) => {
  const { token, nuevaPassword } = req.body;

  if (!token || !nuevaPassword) {
    return res.status(400).json({
      mensaje: "Token y nuevaPassword son obligatorios"
    });
  }

  const usuario = usuarios.find((item) => item.resetToken === token);

  if (!usuario) {
    return res.status(400).json({
      mensaje: "Token inválido"
    });
  }

  usuario.password = nuevaPassword;
  usuario.resetToken = null;

  return res.status(200).json({
    mensaje: "Contraseña actualizada correctamente"
  });
};

module.exports = {
  login,
  logout,
  forgotPassword,
  resetPassword
};

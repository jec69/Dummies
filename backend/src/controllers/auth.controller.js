const login = (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({
      mensaje: "Correo y password son obligatorios"
    });
  }

  if (correo === "admin@test.com" && password === "123456") {
    return res.status(200).json({
      mensaje: "Login exitoso",
      usuario: {
        correo: correo
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

module.exports = {
  login,
  logout
};
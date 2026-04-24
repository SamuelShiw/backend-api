const connection = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = (req, res) => {
  const { username, password } = req.body;

  // 🔹 Validaciones
  if (!username || !password) {
    return res.status(400).json({
      message: "username y password son obligatorios"
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "password mínimo 6 caracteres"
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";

  connection.query(sql, [username, hashedPassword], (err) => {
    if (err) {
      return res.status(500).json({
        message: "Error al registrar usuario",
        error: err.message
      });
    }

    res.status(201).json({
      message: "Usuario registrado correctamente"
    });
  });
};

// LOGIN
exports.login = (req, res) => {
  const { username, password } = req.body;

  // 🔹 Validaciones
  if (!username || !password) {
    return res.status(400).json({
      message: "username y password son obligatorios"
    });
  }

  const sql = "SELECT * FROM users WHERE username = ?";

  connection.query(sql, [username], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Error en login",
        error: err.message
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Usuario no encontrado"
      });
    }

    const user = results[0];

    const passwordValid = bcrypt.compareSync(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({
        message: "Contraseña incorrecta"
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login exitoso",
      token
    });
  });
};
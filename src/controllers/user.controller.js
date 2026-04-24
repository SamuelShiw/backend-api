const connection = require('../config/db');

exports.updateUserRole = (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const allowedRoles = ["admin", "editor", "reader"];

  if (!allowedRoles.includes(role)) {
    return res.status(400).json({
      message: "Rol inválido"
    });
  }

  const sql = "UPDATE users SET role = ? WHERE id = ?";

  connection.query(sql, [role, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Rol actualizado correctamente" });
  });
};
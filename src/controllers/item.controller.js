const connection = require('../config/db');

// GET ALL
exports.getItems = (req, res) => {
  connection.query("SELECT * FROM items", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// GET BY ID
exports.getItemById = (req, res) => {
  const { id } = req.params;

  connection.query("SELECT * FROM items WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "Item no encontrado" });
    }

    res.json(results[0]);
  });
};

// CREATE
exports.createItem = (req, res) => {
  const { nombre, descripcion, estado } = req.body;

  // 🔹 Validaciones
  if (!nombre || !descripcion || estado === undefined) {
    return res.status(400).json({
      message: "nombre, descripcion y estado son obligatorios"
    });
  }

  if (typeof estado !== "boolean") {
    return res.status(400).json({
      message: "estado debe ser true o false"
    });
  }

  const sql = "INSERT INTO items (nombre, descripcion, estado) VALUES (?, ?, ?)";

  connection.query(sql, [nombre, descripcion, estado], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({
      message: "Item creado correctamente",
      id: result.insertId
    });
  });
};

// UPDATE
exports.updateItem = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, estado } = req.body;

  // 🔹 Validaciones
  if (!nombre || !descripcion || estado === undefined) {
    return res.status(400).json({
      message: "nombre, descripcion y estado son obligatorios"
    });
  }

  const sql = "UPDATE items SET nombre = ?, descripcion = ?, estado = ? WHERE id = ?";

  connection.query(sql, [nombre, descripcion, estado, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item no encontrado" });
    }

    res.json({ message: "Item actualizado correctamente" });
  });
};

// DELETE
exports.deleteItem = (req, res) => {
  const { id } = req.params;

  connection.query("DELETE FROM items WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item no encontrado" });
    }

    res.json({ message: "Item eliminado correctamente" });
  });
};
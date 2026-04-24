const connection = require('./db');

const createTables = () => {
  const usersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const itemsTable = `
    CREATE TABLE IF NOT EXISTS items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      descripcion TEXT,
      estado BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  connection.query(usersTable, (err) => {
    if (err) {
      console.error('❌ Error creando tabla users:', err.message);
      return;
    }
    console.log('✅ Tabla users lista');
  });

  connection.query(itemsTable, (err) => {
    if (err) {
      console.error('❌ Error creando tabla items:', err.message);
      return;
    }
    console.log('✅ Tabla items lista');
  });
};

createTables();
require('dotenv').config();
const bcrypt = require('bcryptjs');
const connection = require('./db');

const passwordSamuel = bcrypt.hashSync('123456', 8);
const passwordTigrillo = bcrypt.hashSync('123456', 8);

const queries = [
  `DROP TABLE IF EXISTS items;`,
  `DROP TABLE IF EXISTS users;`,

  `
  CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'reader',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `,

  `
  CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `,

  `
  INSERT INTO users (username, password, role)
  VALUES 
  ('samuel', '${passwordSamuel}', 'admin'),
  ('tigrillo', '${passwordTigrillo}', 'reader');
  `
];

const runQueries = async () => {
  for (const query of queries) {
    await new Promise((resolve, reject) => {
      connection.query(query, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }

  console.log('✅ Base de datos reiniciada correctamente');
  console.log('👑 Usuario admin: samuel / 123456');
  console.log('👀 Usuario reader: tigrillo / 123456');

  connection.end();
};

runQueries().catch((err) => {
  console.error('❌ Error reiniciando BD:', err.message);
  connection.end();
});
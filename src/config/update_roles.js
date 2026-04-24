const connection = require('./db');

const sqlAddRole = `
  ALTER TABLE users
  ADD COLUMN role VARCHAR(20) DEFAULT 'reader';
`;

connection.query(sqlAddRole, (err) => {
  if (err && !err.message.includes("Duplicate column")) {
    console.error("❌ Error agregando columna role:", err.message);
    return;
  }

  console.log("✅ Columna role lista");

  connection.query(
    "UPDATE users SET role = 'admin' WHERE username = 'samuel'",
    (err) => {
      if (err) return console.error("❌ Error actualizando Samuel:", err.message);
      console.log("✅ Samuel ahora es admin");

      connection.query(
        "UPDATE users SET role = 'reader' WHERE username = 'tigrillo'",
        (err) => {
          if (err) return console.error("❌ Error actualizando Tigrillo:", err.message);
          console.log("✅ Tigrillo ahora es reader");
          process.exit();
        }
      );
    }
  );
});
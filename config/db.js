const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "..", "database.sqlite"));

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS camisetas_selecionadas`);
  db.run(`
    CREATE TABLE camisetas_selecionadas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nun_shirt INTEGER NOT NULL UNIQUE,
      name_person TEXT NOT NULL,
      key TEXT NOT NULL UNIQUE
    )
  `);
});

module.exports = db;

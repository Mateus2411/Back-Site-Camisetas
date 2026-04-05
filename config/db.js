const initSqlJs = require("sql.js");
const path = require("path");
const fs = require("fs");

let db = null;

const initDb = async () => {
  const SQL = await initSqlJs();
  const dbPath = path.join(__dirname, "..", "database.sqlite");

  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS camisetas_selecionadas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nun_shirt INTEGER NOT NULL UNIQUE,
      name_person TEXT NOT NULL,
      key TEXT NOT NULL UNIQUE
    )
  `);

  saveDb();
};

const saveDb = () => {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(path.join(__dirname, "..", "database.sqlite"), buffer);
  }
};

const getDb = () => {
  if (!db) throw new Error("Database not initialized. Call initDb() first.");
  return db;
};

module.exports = { initDb, getDb, saveDb };

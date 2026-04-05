const { getDb } = require("../config/db");

const createShirt = (nunshirt, nameperson, key) => {
  const db = getDb();
  db.run(`INSERT INTO camisetas_selecionadas (nun_shirt, name_person, key) VALUES (?,?,?)`, [nunshirt, nameperson, key]);
  const result = db.exec("SELECT last_insert_rowid()");
  const id = result[0].values[0][0];
  return { id, nunshirt, nameperson, key };
};

const searchShirtByNumber = (nunshirt) => {
  const db = getDb();
  const result = db.exec(`SELECT * FROM camisetas_selecionadas WHERE nun_shirt = ${nunshirt}`);
  if (!result.length) return null;
  const row = result[0].values[0];
  return { id: row[0], nun_shirt: row[1], name_person: row[2], key: row[3] };
};

const searchShirtByKey = (key) => {
  const db = getDb();
  const result = db.exec(`SELECT * FROM camisetas_selecionadas WHERE key = '${key}'`);
  if (!result.length) return null;
  const row = result[0].values[0];
  return { id: row[0], nun_shirt: row[1], name_person: row[2], key: row[3] };
};

const getAllShirts = () => {
  const db = getDb();
  const result = db.exec(`SELECT * FROM camisetas_selecionadas`);
  if (!result.length) return [];
  return result[0].values.map(row => ({
    id: row[0],
    nun_shirt: row[1],
    name_person: row[2],
    key: row[3]
  }));
};

const updateShirt = (key, nunshirt, nameperson) => {
  const db = getDb();
  db.run(`UPDATE camisetas_selecionadas SET nun_shirt = ${nunshirt}, name_person = '${nameperson}' WHERE key = '${key}'`);
  return { changes: db.getRowsModified() };
};

const deleteShirt = (key) => {
  const db = getDb();
  db.run(`DELETE FROM camisetas_selecionadas WHERE key = '${key}'`);
  return { changes: db.getRowsModified() };
};

module.exports = { createShirt, searchShirtByNumber, searchShirtByKey, getAllShirts, updateShirt, deleteShirt };

const db = require("../config/db");

const createShirt = (nunshirt, nameperson, key) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO camisetas_selecionadas (nun_shirt, name_person, key) VALUES (?,?,?)`,
      [nunshirt, nameperson, key],
      function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, nunshirt, nameperson, key });
      }
    );
  });
};

const searchShirtByNumber = (nunshirt) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM camisetas_selecionadas WHERE nun_shirt = ?`, [nunshirt], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

const searchShirtByKey = (key) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM camisetas_selecionadas WHERE key = ?`, [key], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

const getAllShirts = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM camisetas_selecionadas`, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

const updateShirt = (key, nunshirt, nameperson) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE camisetas_selecionadas SET nun_shirt = ?, name_person = ? WHERE key = ?`,
      [nunshirt, nameperson, key],
      function (err) {
        if (err) return reject(err);
        resolve({ changes: this.changes });
      }
    );
  });
};

const deleteShirt = (key) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM camisetas_selecionadas WHERE key = ?`, [key], function (err) {
      if (err) return reject(err);
      resolve({ changes: this.changes });
    });
  });
};

module.exports = { createShirt, searchShirtByNumber, searchShirtByKey, getAllShirts, updateShirt, deleteShirt };

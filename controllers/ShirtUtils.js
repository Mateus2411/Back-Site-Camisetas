const db = require("../config/db");
const {
  createShirt,
  searchShirtByNumber,
  searchShirtByKey,
  getAllShirts,
  updateShirt,
  deleteShirt,
} = require("../models/userModels");

const crypto = require("crypto");

const newShirt = (req, res) => {
  const { namePerson, nunShirt } = req.body;
  try {
    const existingShirt = searchShirtByNumber(nunShirt);
    if (existingShirt)
      return res.status(400).json({ msg: "Numero de camisa ja em utilização" });

    const key = crypto.randomUUID();
    const shirt = createShirt(nunShirt, namePerson, key);
    res.status(201).json({ shirt, key });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllShirtsController = (req, res) => {
  try {
    const allShirts = getAllShirts();
    res.status(200).json({ shirts: allShirts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getShirtByKey = (req, res) => {
  const { key } = req.body;
  try {
    const shirt = searchShirtByKey(key);
    if (!shirt) return res.status(404).json({ msg: "Camisa não encontrada" });
    res.status(200).json({ shirt });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updShirt = (req, res) => {
  const { namePerson, nunShirt, key } = req.body;
  try {
    const existingShirt = searchShirtByKey(key);
    if (!existingShirt)
      return res.status(404).json({ msg: "Camisa não encontrada" });

    if (nunShirt && nunShirt !== existingShirt.nun_shirt) {
      const duplicate = searchShirtByNumber(nunShirt);
      if (duplicate)
        return res.status(400).json({ msg: "Numero de camisa ja em utilização" });
    }

    const updatedNun = nunShirt || existingShirt.nun_shirt;
    const updatedName = namePerson || existingShirt.name_person;

    updateShirt(key, updatedNun, updatedName);
    res.status(200).json({ msg: "Camisa atualizada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const delShirt = (req, res) => {
  const { key } = req.body;
  try {
    const result = deleteShirt(key);
    if (result.changes === 0)
      return res.status(404).json({ msg: "Camisa não encontrada" });
    res.status(200).json({ msg: "Camisa deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { newShirt, getAllShirtsController, getShirtByKey, updShirt, delShirt };

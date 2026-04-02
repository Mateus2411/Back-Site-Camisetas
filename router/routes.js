const express = require("express");
const router = express.Router();
const {
  newShirt,
  getAllShirtsController,
  getShirtByKey,
  updShirt,
  delShirt,
} = require("../controllers/ShirtUtils");

router.post("/camisetas/create", newShirt);
router.get("/camisetas/getall", getAllShirtsController);
router.post("/camisetas/get", getShirtByKey);
router.put("/camisetas/update", updShirt);
router.delete("/camisetas/delete", delShirt);

module.exports = router;

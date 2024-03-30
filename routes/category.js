const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.get("/", categoryController.renderCategory);
router.post("/addNew", categoryController.addNew);
router.post("/", categoryController.fetchCates);
router.post("/update", categoryController.update);
router.post("/delete", categoryController.delete);

module.exports = router;
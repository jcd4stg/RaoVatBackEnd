const express = require("express");
const cityController = require("../controllers/cityController")

const router = express.Router();

router.get("/", cityController.list);

router.post("/add", cityController.add);

router.post("/", cityController.fetchCities);

router.post("/update", cityController.update);

router.post("/delete", cityController.delete);

module.exports = router;
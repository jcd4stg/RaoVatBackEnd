const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/add", postController.add);

router.get("/", postController.fetchAllCates);

module.exports = router;
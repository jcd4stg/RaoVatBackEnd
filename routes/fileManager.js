const express = require("express");
const fileManagerController = require("../controllers/fileManagerController")

const router = express.Router();

router.get("/testUpload", fileManagerController.testUpload);

router.post("/uploadFile", fileManagerController.uploadFile);

module.exports = router;
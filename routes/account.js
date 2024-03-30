const express = require("express");
const accountController = require("../controllers/acountController");

const router = express.Router();

router.post("/register", accountController.register);

router.post("/login", accountController.login);

router.post("/verify", accountController.verify);

router.post("/logout", accountController.logout);

module.exports = router;
const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");

router.post("/login", userControllers.login);
router.post("/regester", userControllers.register);

module.exports = router;

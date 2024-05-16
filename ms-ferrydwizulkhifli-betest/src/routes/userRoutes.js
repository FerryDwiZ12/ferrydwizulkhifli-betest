const express = require("express");
const router = express.Router();
const authController = require("../controllers/userController")


router.post('/', authController.registerUser)


module.exports = router
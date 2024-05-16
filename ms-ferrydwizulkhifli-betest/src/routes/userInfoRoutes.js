const express = require("express");
const router = express.Router();
const userInfoController = require("../controllers/userInfoController");
const verifyToken = require("../middleware/validateToken");

// Define routes for user info -- /api/user --
router.use(verifyToken)
router.get("/:accountNumber", userInfoController.getUserInfoByAccountNumber);
router.get("/regisNumber/:registrationNumber", userInfoController.getUserInfoByRegistrationNumberOne);
router.get("/", userInfoController.getAllUsers);
router.post("/", userInfoController.createUserInfo);
router.put("/:id", userInfoController.updateUserInfo);
router.delete("/:id", userInfoController.deleteUser);

module.exports = router;

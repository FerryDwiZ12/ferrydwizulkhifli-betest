const express = require("express");
const router = express.Router();
const accountLoginController = require("../controllers/accountLoginController");
const verifyToken = require("../middleware/validateToken");

// Define routes for account login
router.use(verifyToken)
router.get("/all", accountLoginController.getAllAccountLogin);
router.get("/:accountId", accountLoginController.getAccountLogin);
router.get("/", accountLoginController.getAccountLoginByLastLoginDateTime)
router.post("/", accountLoginController.createAccountLogin);
router.put("/:accountId", accountLoginController.updateAccountLoginById);
router.delete("/:accountId", accountLoginController.deleteAccountLogin);

module.exports = router;

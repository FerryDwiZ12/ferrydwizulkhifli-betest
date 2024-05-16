const accountLoginService = require("../services/accountLoginService");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

exports.getAccountLoginByLastLoginDateTime = async (req, res) => {
  try {
    const accountLogins = await accountLoginService.getAccountLoginByLastLoginDateTime();
    res.status(200).json(accountLogins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllAccountLogin = async (req, res) => {
  try {
    const allAccountLogin = await accountLoginService.getAllAccountLogin();
    if (allAccountLogin.length === 0) {
      return res.status(404).json({ message: "No account login found" });
    }
    res.status(200).json({
      message: "Success to get all user",
      data: allAccountLogin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAccountLogin = async (req, res) => {
  const { accountId } = req.params;
  try {
    const accountLogin = await accountLoginService.getAccountLoginById(accountId);
    if (!accountLogin) {
      return res.status(404).json({ message: "Account login not found" });
    }
    res.json(accountLogin);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// userId di ambil dari token yang login atau data user info dari redis
exports.createAccountLogin = async (req, res) => {
  try {
    const { userName, password, userId } = req.body;
    // Generate salt
    const salt = await bcrypt.genSalt(10);

    const currentTime = new Date();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt);
    // Generate a new userId
    const accountId = uuidv4();

    const accountLogin = await accountLoginService.createAccountLogin({
      accountId,
      userName,
      password: hashedPassword,
      lastLoginDateTime: currentTime,
      userId,
    });
    res.status(201).json(accountLogin);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateAccountLoginById = async (req, res) => {
  const { accountId } = req.params;
  const { userName, password, userId } = req.body;
  try {
    // Enkripsi password baru
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Panggil layanan untuk melakukan pembaruan akun dengan password yang telah dienkripsi
    const accountLogin = await accountLoginService.updateAccountLoginById(accountId, {
      userName,
      password: hashedPassword, // Gunakan password yang telah dienkripsi
      userId,
    });

    if (!accountLogin) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.json(accountLogin);
  } catch (error) {
    console.error("Error in updateAccountLoginById:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAccountLogin = async (req, res) => {
  const { accountId } = req.params;
  try {
    const existingUser = await accountLoginService.getAccountLoginById(accountId);

    if (!existingUser) {
      return res.status(404).json({ message: "Account login not found" });
    }
    await accountLoginService.deleteAccountLogin(existingUser);
    res.json({ message: "Account login deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

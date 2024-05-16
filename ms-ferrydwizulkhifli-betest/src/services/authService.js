const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.authenticateUser = async (userName, password) => {
  try {
    // Verifikasi kata sandi
    const isPasswordValid = await bcrypt.compare(password, userName.password);
    // Jika kata sandi tidak valid, kembalikan null
    if (!isPasswordValid) {
      return null;
    }
    // Jika kredensial valid, kembalikan pengguna
    return userName;
  } catch (error) {
    throw new Error("Error in user authentication");
  }
};

exports.generateAuthToken = (userId) => {
  return jwt.sign({ userId },process.env.ACCES_TOKEN_SECRET, { expiresIn: "1d" });
};
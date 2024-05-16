const { getUserName } = require("../services/accountLoginService");
const { authenticateUser, generateAuthToken } = require("../services/authService");

exports.userLogin = async (req, res) => {
  const { userName, password } = req.body;

  try {
    // Cari pengguna berdasarkan userName
    const checkUserName = await getUserName(userName);
    if (!checkUserName) {
      throw new Error("UserName not found");
    }

    // Autentikasi pengguna
    const user = await authenticateUser(checkUserName, password);


    // Jika pengguna tidak ditemukan atau kata sandi tidak valid, kirim respon kesalahan
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials or user not found" });
    }


    // Buat token JWT
    const token = generateAuthToken(user.userId);

    // Kirim token JWT dalam respon
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

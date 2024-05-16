const { userRegister } = require("../services/userService");

exports.registerUser = async (req, res) => {
  try {
    const { fullName, emailAddress, registrationNumber, password} = req.body;
    const result = await userRegister(fullName, emailAddress, registrationNumber , password);
    res.status(201).json({
      message: "User registered successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

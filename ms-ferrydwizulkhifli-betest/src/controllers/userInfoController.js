const UserInfoService = require("../services/userInfoService");
const { v4: uuidv4 } = require("uuid");
const {client}  = require("../config/redis-client");

exports.getAllUsers = async (req, res) => {
  try {
    const value = await client.get(req.user.userId);
    if (value) {
      const cached = JSON.parse(value);
      res.status(200).json({
        message: "Success to get all user",
        data: cached,
      });
    } else {
      const allUsers = await UserInfoService.getAllUsers();
      await client.set(req.user.userId, JSON.stringify(allUsers));
      res.status(200).json({
        message: "Success to get all user",
        data: allUsers,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserInfoByAccountNumber = async (req, res) => {
  try {
    const { accountNumber } = req.params;
    const userInfo = await UserInfoService.getUserInfoByAccountNumber(accountNumber);
    res.status(200).json({
      message: "Success",
      data: userInfo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserInfoByRegistrationNumberOne = async (req, res) => {
  try {
    const { registrationNumber } = req.params;
    const userInfo = await UserInfoService.getUserInfoByRegistrationNumber(registrationNumber);
    res.status(200).json({
      message: "Success",
      data: userInfo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.createUserInfo = async (req, res) => {
  try {
    const { fullName, emailAddress, registrationNumber } = req.body;

    // Check if the length of registrationNumber is less than or equal to 9
    if (registrationNumber.length <= 9) {
      throw new Error("Registration number must be longer than 9 characters");
    }

    // Generate a new userId
    const userId = uuidv4();

    // Generate a random 9 number between 0 and 9 for accountNumber
    let generateAccountNumber = "";
    for (let i = 0; i < 15; i++) {
      const randomDigit = Math.floor(Math.random() * 9) + 1;
      generateAccountNumber += randomDigit;
    }

    // Create the user
    const userInfo = await UserInfoService.createUserInfo({
      userId,
      fullName,
      emailAddress,
      accountNumber: generateAccountNumber,
      registrationNumber,
    });

    res.status(201).json({
      message: "Success create user info",
      userInfo,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUserInfo = async (req, res) => {
  const { id } = req.params;
  const { fullName, emailAddress } = req.body;
  try {
    const userInfoData = {};
    if (fullName) userInfoData.fullName = fullName;
    if (emailAddress) userInfoData.emailAddress = emailAddress;
    const updatedUserInfo = await UserInfoService.updateUser(id, userInfoData);
    res.status(200).json({ message: "User info updated successfully", userInfo: updatedUserInfo });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const existingUser = await UserInfoService.getUserById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    await UserInfoService.deleteUser(id);
    res.status(200).json({ message: "User info deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

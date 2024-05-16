const UserInfo = require("../models/userInfo.model");
const AccountLogin = require("../models/accountLogin.model");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

exports.userRegister = async (fullName, emailAddress, registrationNumber, password) => {
  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Generate a random 9 number between 0 and 9 for accountNumber
    let generateAccountNumber = "";
    for (let i = 0; i < 15; i++) {
      const randomDigit = Math.floor(Math.random() * 9) + 1;
      generateAccountNumber += randomDigit;
    }

    // generate uuid
    const uuid = uuidv4();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check for existing user with the same email address
    const existingUserByEmail = await UserInfo.findOne({ emailAddress });
    if (existingUserByEmail) {
      throw new Error("A user with this email address already exists.");
    }

    // Check for existing user with the same registration number
    const existingUserByRegistrationNumber = await UserInfo.findOne({ registrationNumber });
    if (existingUserByRegistrationNumber) {
      throw new Error("A user with this registration number already exists.");
    }

    // Create UserInfo entry
    const userInfo = new UserInfo({
      userId: uuid,
      fullName,
      accountNumber: generateAccountNumber,
      emailAddress,
      registrationNumber,
    });
    await userInfo.save();

    const currentTime = new Date();

    // Create AccountLogin entry
    const accountLogin = new AccountLogin({
      accountId: uuid,
      userName: generateRandomUsername(fullName),
      password: hashedPassword,
      userId: userInfo.userId,
      lastLoginDateTime : currentTime,
    });
    await accountLogin.save();

    return { userInfo, accountLogin };
  } catch (error) {
    throw new Error("Error in user registration: " + error.message);
  }
};

// Function to generate a random username from the first name
function generateRandomUsername(fullname) {
  const randomSuffix = Math.floor(Math.random() * 1000);
  return `${fullname.toLowerCase()}${randomSuffix}`;
}

exports.getUserInfoByRegistrationNumber = async (registrationNumber) => {
  const userInfo = await UserInfo.findOne({ registrationNumber });
  return userInfo;
};

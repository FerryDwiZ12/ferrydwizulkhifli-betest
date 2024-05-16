const UserInfo = require("../models/userInfo.model");

exports.getUserById = async (userId) => {
  try {
    const userInfo = await UserInfo.findOne({ userId: userId });
    return userInfo;
  } catch (error) {
    throw new Error("Error in getting user info by id");
  }
};


exports.getAllUsers = async () => {
  try {
    const allUsers = await UserInfo.find();
    return allUsers;
  } catch (error) {
    throw new Error("Error in getting all user info");
  }
};

exports.getUserInfoByAccountNumber = async (accountNumber) => {
  try {
    const userInfo = await UserInfo.findOne({ accountNumber });
    return userInfo;
  } catch (error) {
    throw new Error("Error in getting user info by account number");
  }
};

exports.getUserInfoByRegistrationNumber = async (registrationNumber) => {
  const userInfo = await UserInfo.findOne({ registrationNumber });
  return userInfo;
};

exports.getUserInfoRegisterLastNumber = async () => {
  const lastUser = await UserInfo.findOne().sort("-registrationNumber");
  if (lastUser) {
    return lastUser.registrationNumber;
  }else{
    return 0
  }
};

exports.incrementAccountNumber = async () => {
  try {
    const lastAccountNumber = await UserInfo.findOne().sort("-accountNumber");

    if (lastAccountNumber) {
      const lastAccuntNumberOne = lastAccountNumber.accountNumber;
      return lastAccuntNumberOne;
    } else {
      return 0;
    }
  } catch (error) {
    throw new Error("Error in getting last Accunt number");
  }
};

exports.createUserInfo = async (userInfoData) => {
  const newUserInfo = new UserInfo(userInfoData);
  return await newUserInfo.save();
};

exports.updateUser = async (userId, userInfoData) => {
  return await UserInfo.findOneAndUpdate({ userId }, userInfoData, { new: true });
};

exports.deleteUser = async (userId) => {
  return await UserInfo.deleteOne({ userId });
};

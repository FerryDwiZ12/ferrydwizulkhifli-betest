const AccountLogin = require("../models/accountLogin.model");

exports.getAccountLoginByLastLoginDateTime = async () => {
  try {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const accountLogins = await AccountLogin.find({ lastLoginDateTime: { $gt: threeDaysAgo } });
    return accountLogins;
  } catch (error) {
    throw new Error("Error in getting account login by last login date time");
  }
};

exports.getAllAccountLogin = async () => {
  const allAccountLogin = await AccountLogin.find();
  return allAccountLogin;
};

exports.getUserName = async (userName) => {
  const userInfo = await AccountLogin.findOne({ userName });
  return userInfo;
};

exports.getAccountLoginById = async (accountId) => {
  try {
    const accountLogin = await AccountLogin.findOne({ accountId: accountId });
    return accountLogin;
  } catch (error) {
    throw new Error("Error in getting account login by ID");
  }
};

exports.createAccountLogin = async (accountData) => {
  try {
    const accountLogin = new AccountLogin(accountData);
    await accountLogin.save();
    return accountLogin;
  } catch (error) {
    throw new Error("Error in creating account login");
  }
};

exports.updateAccountLoginById = async (accountId, newData) => {
  return await AccountLogin.findOneAndUpdate({ accountId }, newData, { new: true });
};

exports.deleteAccountLogin = async (accountId) => {
  return (accountLogin = await AccountLogin.findByIdAndDelete(accountId));
};

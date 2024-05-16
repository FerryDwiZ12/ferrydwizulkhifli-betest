const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  emailAddress: { type: String, required: true, unique: true },
  registrationNumber: { type: String, required: true, unique: true },
});

userInfoSchema.index({ userId: 1 });
userInfoSchema.index({ emailAddress: 1 });
userInfoSchema.index({ registrationNumber: 1 });

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

module.exports = UserInfo;

// register = accountNumber = random number 1-9 = 9
// resigerNumber = nomer hp

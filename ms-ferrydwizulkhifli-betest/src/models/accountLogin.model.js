const mongoose = require("mongoose");

const accountLoginSchema = new mongoose.Schema({
  accountId: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  lastLoginDateTime: { type: Date, default: Date.now },
  userId: { type: String, ref: "UserInfo", required: true },
});

accountLoginSchema.set("_id", "accountId");

accountLoginSchema.index({ accountId: 1 });
accountLoginSchema.index({ lastLoginDateTime: 1 });
accountLoginSchema.index({ userId: 1 });
  
const AccountLogin = mongoose.model("AccountLogin", accountLoginSchema);

module.exports = AccountLogin;

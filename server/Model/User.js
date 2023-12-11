const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userNum: Number,
    email: String,
    displayName: String,
    uid: String,
  },
  { collection: "users" } // 이름변경 가능
);

const User = mongoose.model("User", userSchema);

module.exports = { User };

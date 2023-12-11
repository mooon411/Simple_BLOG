const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema(
  {
    name: String,
    postNum: Number,
    userNum: Number,
  },
  { collection: "counter" } // 이름변경 가능
);

const Counter = mongoose.model("Counter", counterSchema);

module.exports = { Counter };

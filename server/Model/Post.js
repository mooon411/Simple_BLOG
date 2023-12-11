const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    postNum: Number,
    image: String,
  },
  { collection: "posts" } // 이름변경 가능
);

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };

const express = require("express");
const router = express.Router();
const multer = require("multer");

// 스키마
const { Post } = require("../Model/Post.js");
const { Counter } = require("../Model/Counter.js");

const setUpload = require("../util/upload.js");

// 글쓰기
router.post("/write", (req, res) => {
  let temp = req.body;
  // 넘버 추가 작업
  Counter.findOne({ name: "counter" })
    .exec()
    .then((counter) => {
      temp.postNum = counter.postNum;

      const BlogPost = new Post(temp);
      BlogPost.save().then(() => {
        Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } }).then(
          () => {
            res.status(200).json({ success: true });
          }
        );
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});

// 글목록
router.post("/list", (req, res) => {
  Post.find()
    .exec()
    .then((result) => {
      res.status(200).json({ success: true, postList: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});

// 글 상세
router.post("/detail", (req, res) => {
  Post.findOne({ postNum: req.body.postNum })
    .exec()
    .then((result) => {
      res.status(200).json({ success: true, post: result });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

// 글 수정
router.post("/modify", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
  };
  Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
    .exec()
    .then((result) => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

// 글 삭제
router.post("/delete", (req, res) => {
  Post.deleteOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

// 이미지 업로드 - 로컬용

//multer - Storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "image/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage }).single("file");

// router.post("/image/upload", (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       res.status(400).json({ success: false });
//     } else {
//       res.status(200).json({ success: true, filePath: res.req.file.path });
//     }
//   });
// });

// module.exports = router;

router.post("/image/upload", setUpload("simsim/post"), (req, res, next) => {
  res.status(200).json({ success: true, filePath: res.req.file.location });
});

module.exports = router;

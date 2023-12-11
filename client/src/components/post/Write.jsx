import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Image from "./Image";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  let navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "" || content === "") {
      return alert("내용을 채워주세요!");
    }

    let body = {
      title: title,
      content: content,
      image: image,
    };

    axios.post("/api/post/write", body).then((response) => {
      if (response.data.success) {
        alert("글 작성이 완료되었습니다.");
        navigate("/list");
      } else {
        alert("글 작성이 실패하였습니다.");
      }
    });
  };

  return (
    <div className="login_wrap">
      <div className="login_header">
        <h3>WRITE</h3>
        <p>글을 작성해보세요</p>
      </div>

      <form className="login_form">
        <fieldset>
          <div>
            <label htmlFor="title" className="required blind">
              글 제목
            </label>
            <div className="check">
              <input
                type="text"
                id="title"
                name="title"
                placeholder="글 제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </div>
          </div>

          <legend className="blind">글 내용</legend>
          <div>
            <label htmlFor="write" className="required blind">
              글쓰기
            </label>
            <div className="check">
              <textarea
                type="text"
                id="write"
                placeholder="글 내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.currentTarget.value)}
              ></textarea>
            </div>
          </div>

          <Image setImage={setImage} />

          <button
            type="submit"
            id="submitBtn"
            className="btn__style mt100"
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            글쓰기
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Write;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Modify = () => {
  const [postInfo, setPostInfo] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  let params = useParams();
  let navigate = useNavigate();

  // 글 정보 가져오기
  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };

    axios
      .post("/api/post/detail", body)
      .then((response) => {
        if (response.data.success) {
          setPostInfo(response.data.post);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.postNum]);

  useEffect(() => {
    setTitle(postInfo.title);
    setContent(postInfo.content);
  }, [postInfo]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "" || content === "") {
      return alert("모든 항목을 채워주세요!!");
    }

    let body = {
      title: title,
      content: content,
      postNum: params.postNum,
    };

    axios
      .post("/api/post/modify", body)
      .then((response) => {
        if (response.data.success) {
          alert("글 수정이 완료됐습니다.");
          navigate("/list");
        } else {
          alert("글 수정이 실패하였습니다");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login_wrap">
      <div className="login_header">
        <h3>MODIFY</h3>
        <p>글을 수정하세요</p>
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
                value={title || ""}
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
                value={content || ""}
                onChange={(e) => setContent(e.currentTarget.value)}
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            id="submitBtn"
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            수정하기
          </button>
          <button type="submit" id="submitBtn">
            취소하기
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Modify;

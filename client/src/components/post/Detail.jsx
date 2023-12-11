import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Detail = () => {
  const [postInfo, setPostInfo] = useState({});

  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };

    axios
      .post("/api/post/detail", body)
      .then((response) => {
        setPostInfo(response.data.post);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.postNum]);

  // 삭제 버튼
  const DeleteHandler = () => {
    if (window.confirm("정말로 삭제하겠습니까?")) {
      let body = {
        postNum: params.postNum,
      };
      axios
        .post("/api/post/delete", body)
        .then((response) => {
          if (response.data.success) {
            alert("삭제 완료");
            navigate("/list");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("삭제 실패");
        });
    }
  };

  return (
    <div className="detail_wrap">
      <div className="detail_title">
        <h3>{postInfo.title}</h3>
        <p className="auth">abc</p>
      </div>
      <div className="detail_content">
        {postInfo.image ? (
          <img src={postInfo.image} alt="{postInfo.title}" />
        ) : null}
        {postInfo.content}
      </div>
      <div className="detail_btn">
        <Link to={`/modify/${postInfo.postNum}`}>수정하기</Link>
        <button onClick={() => DeleteHandler()}>삭제하기</button>
        <Link to="/list">목록보기</Link>
      </div>
    </div>
  );
};

export default Detail;

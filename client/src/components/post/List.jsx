import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const List = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    axios.post("/api/post/list").then((response) => {
      console.log(response);
      if (response.data.success) {
        setPostList([...response.data.postList]);
      }
    });
  }, []);

  return (
    <>
      <div className="page_header">
        <h3>LIST</h3>
        <p>글을 확인하세요</p>
      </div>
      <div className="list_wrap">
        {postList.map((post, key) => (
          <div className="list" key={key}>
            <span className="cate">교육</span>
            <h3 className="title">
              <Link to={`/detail/${post.postNum}`}>{post.title}</Link>
            </h3>
            <p className="desc">{post.content}</p>
            <div className="auth">문영인</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;

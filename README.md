# client

```bash
npx create-react-app .
npm install react-router-dom
npm install react-bootstrap bootstrap
npm install axios
npm install http-proxy-middleware
npm install sass
npm install @emotion/css
npm install @emotion/react
npm install @emotion/styled
npm install firebase
npm install react-redux
npm install @reduxjs/toolkit

```

# server

```bash
npm init -y
npm install express --save
npm install nodemon --save
npm install path --save
npm install mongoose --save
npm install multer --save
npm install aws-sdk@2.348.0 --save
npm install multer-s3@2.10.0 --save


```

## 제작 과정

- express 실행

  ```js
  const express = require("express");
  const mongoose = require("mongoose");
  const path = require("path");
  const app = express();
  const port = 5050;

  // 정적 파일을 제공하기 위해 Express의 static 미들웨어를 사용합니다.
  app.use(express.static(path.join(__dirname, "../client/build/")));

  // 서버를 특정 포트로 실행합니다.
  app.listen(port, () => {
    // MongoDB에 연결합니다.
    mongoose
      .connect(
        "mongodb+srv://moon01:moon0411@cluster0.64elyj3.mongodb.net/?retryWrites=true&w=majority"
      )
      .then(() => {
        console.log("서버 실행 중 ---> " + port);
        console.log("MongoDB 연결 중...");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // 루트 경로 "/"에 대한 GET 요청에 대한 처리를 설정합니다.
  app.get("/", (req, res) => {
    // 클라이언트에게 index.html 파일을 전송합니다.
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  // 모든 경로에 대한 GET 요청에 대한 처리를 설정합니다.
  app.get("*", (req, res) => {
    // 클라이언트에게 index.html 파일을 전송합니다.
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
  ```

<br>

- nodemon 사용하기
  server > package.json

  ```js
  "scripts": {
    "start": "nodemon index.js"
  },
  ```

- 리액트 네브바
  [리액트 부트스트랩](https://react-bootstrap.netlify.app/)

- axios POST요청
  [AXIOS](https://axios-http.com/kr/docs/post_example)

  1. React 측 코드 (List 컴포넌트)

  ```js
  import React, { useEffect } from "react";
  import axios from "axios";

  const List = () => {
    useEffect(() => {
      // List 컴포넌트가 마운트될 때 실행되는 useEffect 함수
      axios
        .post("/api/test") // 서버로 POST 요청을 보냄
        .then((response) => {
          // 요청이 성공했을 때의 처리
          alert("요청성공");
          console.log(response); // 서버에서 받은 응답을 콘솔에 출력
        })
        .catch((error) => {
          // 요청이 실패했을 때의 처리
          alert("요청실패");
          console.log(error); // 에러 메시지를 콘솔에 출력
        });
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

    return <div>List</div>; // List 컴포넌트의 렌더링 결과로 'List' 텍스트를 반환
  };

  export default List;
  ```

  2. Express 서버 측 코드 (index.js)

  ```js
  app.post("/api/test", (req, res) => {
    console.log(req); // 요청 객체를 콘솔에 출력
    res.status(200).json({ success: true }); // 성공 응답을 JSON 형태로 반환
  });
  ```

  3. 프록시 설정

  ```js
  const { createProxyMiddleware } = require("http-proxy-middleware");

  module.exports = function (app) {
    app.use(
      "/api",
      createProxyMiddleware({
        target: "http://localhost:5050", // 요청이 전달될 실제 서버 주소
        changeOrigin: true, // 도메인이 변경되었을 때, 올바르게 동작하도록 설정
      })
    );
  };
  ```

  서버 먼저 연결한 후 실행하면 요청 성공!

- 서버에서 요청하고 보내기

  클라이언트 측(React)에서 서버 측(Express)로 데이터를 전송하고, 서버에서 해당 요청을 처리하여 응답을 반환하는 방법

  ```js
  // 리액트측 list.js

  const List = () => {
    const [text, setText] = useState(""); // 상태 변수 text를 선언하고 초기값은 빈 문자열로 설정
    useEffect(() => {
      // List 컴포넌트가 마운트될 때 실행되는 useEffect 함수
      let body = {
        text: "다시 보낸다. 잘 받아라!", // body 객체에 text 속성을 가진 값을 설정
      };
      axios
        .post("/api/test", body) // 서버로 POST 요청을 보내며 body 데이터를 함께 전송
        .then((response) => {
          // 요청이 성공했을 때의 처리
          setText(response.data.text); // 서버에서 받은 데이터의 text 값을 상태 변수에 저장
          console.log(response); // 서버 응답을 콘솔에 출력
        })
        .catch((error) => {
          // 요청이 실패했을 때의 처리
          console.log(error); // 에러 메시지를 콘솔에 출력
        });
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

    return (
      <div>
        <h3>{text}</h3> {/* 서버에서 받은 데이터를 화면에 출력 */}
      </div>
    );
  };

  export default List;
  ```

  ```js
  //서버측 index.js

  app.use(express.json()); // JSON 데이터 파싱을 위한 미들웨어 등록
  app.use(express.urlencoded({ extended: true })); // URL-encoded 데이터 파싱을 위한 미들웨어 등록

  // 다른 미들웨어 및 라우팅 코드...

  app.post("/api/test", (req, res) => {
    console.log(req.body); // 요청 객체의 body 속성을 콘솔에 출력
    res.status(200).json({ success: true, text: "서버에서 보내는 데이터" }); // 클라이언트에게 JSON 형태의 응답을 반환
  });
  ```

- 이모션
  [이모션](https://emotion.sh/docs/introduction)

    <details>
    <summary>태그를 스타일로!</summary>
    1. upload.js

  ```js
  import {
    UploadDiv,
    UploadTitle,
    UloadForm,
    UploadButton,
  } from "../style/UploadCSS";

  const Upload = () => {
    return (
      <UploadDiv>
        <UploadTitle>글을 작성해 주세요!</UploadTitle>
        <UloadForm>
          <label htmlFor="title">제목</label>
          <input id="title" type="text"></input>
          <label htmlFor="content">내용</label>
          <textarea id="content"></textarea>
          <UploadButton>
            <button>저장하기</button>
          </UploadButton>
        </UloadForm>
      </UploadDiv>
    );
  };
  ```

  2. upload.css

  ```js
  import styled from "@emotion/styled";

  const UploadDiv = styled.div`
    width: 100%;
  `;
  const UploadTitle = styled.h3`
    text-align: center;
    padding: 10px;
  `;
  const UloadForm = styled.form`
    width: 500px;
    margin: 0 auto;
    label {
      display: block;
    }
    input {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
    }
    textarea {
      width: 100%;
      height: 300px;
      resize: none;
      padding: 10px;
    }
  `;
  const UploadButton = styled.div`
    button {
      border: 1px solid #000;
      background: #ccc;
      width: 100%;
      padding: 10px;
    }
  `;
  export { UploadDiv, UploadTitle, UloadForm, UploadButton };
  ```

    </details>
    
  <br>

- 몽고디비 연동하기 - 테스트!

  서버측 (Model > post.js) 스키마 만들기!

  ```js
  // MongoDB와 Mongoose를 사용하여 데이터 모델을 정의

  const mongoose = require("mongoose");

  // 데이터 모델(postSchema) 정의
  const postSchema = new mongoose.Schema({
    title: String, // 'title' 필드는 문자열(String) 타입
    content: String, // 'content' 필드는 문자열(String) 타입
  });

  // 'Post' 모델 정의 (mongoose.model을 사용하여 MongoDB의 'Post' 컬렉션과 연결)
  const Post = mongoose.model("Post", postSchema);

  module.exports = { Post }; // Post 모델을 외부에서 사용할 수 있도록 내보내기
  ```

  서버측 (index.js)

  ```js
  // 클라이언트로부터 받은 데이터를 사용하여 MongoDB에 새로운 데이터를 추가

  const { Post } = require("./Model/post"); // post.js에서 정의한 Post 모델 불러오기

  app.post("/api/test", (req, res) => {
    // 클라이언트에서 받은 데이터를 사용하여 BlogPost 생성
    const BlogPost = new Post({
      title: "테스트", // 새로운 포스트의 제목
      content: "테스트입니다.", // 새로운 포스트의 내용
    });

    BlogPost.save()
      .then(() => {
        // 새로운 포스트를 데이터베이스에 저장
        res.status(200).json({ success: true }); // 성공적으로 저장되면 클라이언트에게 성공 메시지를 JSON 형태로 반환
      })
      .catch((err) => {
        console.log(err);
      });
  });
  ```

<br>

- 몽고디비에 데이터 저장하고 조회하기!

  클라이언트는 axios를 사용하여 POST 요청을 서버로 보내고, 서버는 받은 데이터를 MongoDB에 저장하거나 저장된 데이터를 조회하여 클라이언트로 반환하는 역할을 합니다.

  서버측 (index.js)

  ```js
  // 클라이언트로부터 전송된 데이터를 받아 MongoDB에 저장하고, 저장된 데이터를 조회하는 엔드포인트 구현

  // 새로운 데이터를 추가하는 엔드포인트
  app.post("/api/post/submit", (req, res) => {
    let temp = req.body; // 클라이언트에서 받은 요청의 body를 변수 temp에 저장
    console.log(temp); // 받은 데이터를 콘솔에 출력

    // MongoDB에 새로운 데이터를 추가하기 위해 새로운 Post 인스턴스 생성
    const BlogPost = new Post(temp);
    BlogPost.save() // MongoDB에 데이터 저장
      .then(() => {
        res.status(200).json({ success: true }); // 성공적으로 저장되면 클라이언트에게 성공 메시지 반환
      })
      .catch((err) => {
        console.log(err); // 에러 발생 시 에러 메시지를 콘솔에 출력
        res.status(400).json({ success: false }); // 실패 시 클라이언트에게 실패 메시지 반환
      });
  });

  // 데이터를 조회하는 엔드포인트
  app.post("/api/post/list", (req, res) => {
    Post.find() // MongoDB에서 모든 데이터를 조회
      .exec()
      .then((doc) => {
        res.status(200).json({ success: true, postList: doc }); // 조회된 데이터를 postList와 함께 클라이언트에게 반환
      })
      .catch((err) => {
        console.log(err); // 조회 중 에러 발생 시 에러 메시지를 콘솔에 출력
        res.status(400).json({ success: false }); // 실패 시 클라이언트에게 실패 메시지 반환
      });
  });
  ```

  클라이언트 측 (Upload 컴포넌트)

  ```js
  // 사용자가 글을 작성하고 저장하는 Upload 컴포넌트

  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import {
    UploadDiv,
    UploadTitle,
    UloadForm,
    UploadButton,
  } from "../style/UploadCSS";

  const Upload = () => {
    const [title, setTitle] = useState(""); // 제목 상태 변수
    const [content, setContent] = useState(""); // 내용 상태 변수
    let navigate = useNavigate();

    const onSubmit = (e) => {
      e.preventDefault();

      // 제목 또는 내용이 비어있을 경우 알림
      if (title === "" || content === "") {
        return alert("제목 또는 내용을 입력해주세요!");
      }

      let body = {
        title: title,
        content: content,
      };

      // 서버로 데이터를 전송하여 글 작성 요청
      axios.post("/api/post/submit", body).then((response) => {
        if (response.data.success) {
          alert("글 작성이 완료되었습니다."); // 성공적으로 작성된 경우 알림
          navigate("/list"); // 글 목록 페이지로 이동
        } else {
          alert("글 작성이 실패하였습니다."); // 작성 실패 시 알림
        }
      });
    };

    return (
      <UploadDiv>
        <UploadTitle>글을 작성해 주세요!</UploadTitle>
        <UloadForm>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
            type="text"
          ></input>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => {
              setContent(e.currentTarget.value);
            }}
          ></textarea>
          <UploadButton>
            <button
              onClick={(e) => {
                onSubmit(e);
              }}
            >
              저장하기
            </button>
          </UploadButton>
        </UloadForm>
      </UploadDiv>
    );
  };

  export default Upload;
  ```

### 리액트 서버 통신 `http-proxy-middleware`

[바로가기]('https://create-react-app.dev/docs/proxying-api-requests-in-development/')

```js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // 요청을 프록시화할 엔드포인트 경로
    createProxyMiddleware({
      target: "http://localhost:5000", // 프록시 요청이 전달될 대상 서버의 주소 (포트번호 변경 가능)
      changeOrigin: true, // 변경된 도메인 정보를 원본 도메인으로 간주
    })
  );
};
```

### cors 에러

Cross Origin Resource Sharing, 교차 출처 리소스 공유

CORS는 다른 출처의 자원의 공유를 가능하게 만듭니다. 또한, 추가 HTTP 헤더를 사용하여, 한 출처에서 실행 중인 웹 에플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제입니다. CORS 에러는 브라우저가 뿜어내는 것입니다. Server↔Server는 CORS 에러가 나지 않습니다.

[CORS 에러 해결하기]("https://www.datoybi.com/http-proxy-middleware/")
# Simple_BLOG

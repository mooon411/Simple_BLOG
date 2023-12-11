import React, { useEffect, useState } from "react";
import firebase from "../../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  let navigate = useNavigate();

  const LoginFunc = async (e) => {
    e.preventDefault();
    if (!(email && password)) {
      return alert("모든 값을 채워주세요");
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      alert("환영합니다 ^__^");
      navigate("/");
    } catch (err) {
      console.log(err.code);
      if (err.code === "auth/invalid-email") {
        setErrorMsg("존재하지 않는 이메일입니다.");
      } else if (err.code === "auth/invalid-credential") {
        setErrorMsg("비밀번호가 다릅니다.");
      } else {
        setErrorMsg("로그인 실패");
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMsg("");
    }, 5000);
  }, [errorMsg]);

  return (
    <div className="login_wrap">
      <div className="login_header">
        <h3>LOGIN</h3>
        <p>회원가입은 했겠죠?!</p>
      </div>

      <form className="login_form">
        <fieldset>
          <legend className="blind">로그인 영역</legend>
          <div>
            <label
              htmlFor="youEmail"
              className="required blind"
              autoComplete="off"
            >
              이메일
            </label>
            <input
              type="email"
              id="youEmail"
              name="youEmail"
              placeholder="이메일"
              className="input__style"
              autoComplete="off"
              required
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div>
            <label htmlFor="youPass" className="required blind">
              비밀번호
            </label>
            <input
              type="password"
              id="youPass"
              name="youPass"
              placeholder="비밀번호"
              className="input__style"
              autoComplete="off"
              required
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          <div>{errorMsg !== "" && <p>{errorMsg}</p>}</div>
          <button
            type="submit"
            onClick={(e) => LoginFunc(e)}
            className="btn__style2 mt30"
          >
            로그인
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";

import firebase from "../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const [youName, setYouName] = useState("");
  const [youEmail, setYouEmail] = useState("");
  const [youPass, setYouPass] = useState("");
  const [youPassC, setYouPassC] = useState("");
  const [flag, setFlag] = useState(false);

  let navigate = useNavigate();

  const JoinFunc = async (e) => {
    setFlag(true);
    e.preventDefault();

    if (!(youName && youEmail && youPass && youPassC)) {
      return alert("모든 항목을 입력하셔야 회원가입이 가능합니다.");
    }
    if (youPass !== youPassC) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    // 개인정보 --> firebase
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(youEmail, youPass);

    await createdUser.user.updateProfile({
      displayName: youName,
    });

    // console.log(createdUser.user);

    // 개인정보 ---> mongoDB
    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
    };

    axios.post("/api/user/join", body).then((response) => {
      setFlag(false);
      if (response.data.success) {
        // 회원가입 성공
        navigate("/login");
      } else {
        return alert("회원가입 실패 ㅠㅠ");
      }
    });
  };

  return (
    <div className="login_wrap">
      <div className="login_header">
        <h3>JOIN</h3>
        <p>로그인하려면 필요함~!</p>
      </div>

      <form className="login_form">
        <fieldset>
          <legend className="blind">회원가입 영역</legend>
          <div>
            <label htmlFor="youName" className="required blind">
              이름
            </label>
            <div className="check">
              <input
                type="text"
                id="youName"
                name="youName"
                placeholder="이름"
                value={youName}
                onChange={(e) => setYouName(e.currentTarget.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="youEmail" className="required blind">
              이메일
            </label>
            <div className="check">
              <input
                type="text"
                id="youEmail"
                name="youEmail"
                placeholder="이메일"
                value={youEmail}
                onChange={(e) => setYouEmail(e.currentTarget.value)}
              />
            </div>
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
              autoComplete="off"
              minLength={8}
              value={youPass}
              onChange={(e) => setYouPass(e.currentTarget.value)}
            />
          </div>

          <div>
            <label htmlFor="youPassC" className="required blind">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="youPassC"
              name="youPassC"
              placeholder="비밀번호 재확인"
              autoComplete="off"
              minLength={8}
              value={youPassC}
              onChange={(e) => setYouPassC(e.currentTarget.value)}
            />
          </div>

          <button
            disabled={flag}
            type="submit"
            id="submitBtn"
            className="btn__style mt100"
            onClick={(e) => {
              JoinFunc(e);
            }}
          >
            회원가입
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Join;

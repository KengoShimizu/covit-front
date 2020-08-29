import React, { useRef, useState } from 'react';
// library
import { Link } from 'react-router-dom';
import axios from "axios";
// components
import HomeLayout from '../../../../templates/HomeLayout';

export const Send: React.FC = (props: any) => {
  const buttonRef = useRef(document.createElement("button"));
  const [text, setText] = useState("");
  const [err, setErr] = useState("");

  // FIXME sendはここじゃなくボタン押した時に発火、成功すればこのページにリダイレクト
  const send = async () => {
    const path: string = props.location.state.text === "登録" ? "resend_activation_email" : "resend_login_email";
    try {
      await axios.post(
        `/api/v1/user/users/${path}`,
        {
          email: props.location.state.email
        }
      )
      .then(res => setText(res.data.message))
      .catch(err => setErr(err.response.data.errors[0]));

      return;

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <HomeLayout>
      <div>
        <div className="err">{err}</div>
        <div className="text">{text}</div>
        {props.location.state.email}宛に認証メールを送信しました。<br />
          メール内に記載されているリンクをクリックして{props.location.state.text}を完了してください。
          <button ref={buttonRef} onClick={send}>
            もう一度メールを送信する
          </button>
        <Link to='/accounts/login'>ログインはこちら</Link>
      </div>
    </HomeLayout>
  );
}
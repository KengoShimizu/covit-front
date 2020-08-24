import React, { useRef, useState } from 'react';
import {CommonStyle} from './../../../../common/CommonStyle';
import { Link } from 'react-router-dom';
import axios from "axios";
import { HomeLayout } from '../../../templates/HomeLayout';

export const EmailRegister: React.FC = (props: any) => {
  const mailRef = useRef(document.createElement("input"));
  const buttonRef = useRef(document.createElement("button"));
  const [err, setErr] = useState("");

  const send = async () => {
    if (!mailRef.current.value) return;
    await axios.post(
      '/api/v1/common/sessions/sign_up',
      {
        email: mailRef.current.value,
      }
    )
      .then(res => res.data)
      .catch(err => setErr(err.response.data.errors[0]));

    if (!err) {
      props.history.push({
        pathname: "/accounts/send",
        state: {
          email: mailRef.current.value,
          text: '登録'
        }
      });
    }
    return;
  }

  return (
    <HomeLayout>
      <div className="form">
        <div className="err">{err}</div>
        <div className="mail-form">
          <label>メールアドレス</label>
          <input ref={mailRef} type="text" placeholder="メールアドレス" />
        </div>
        <div className="button-container">
          <button ref={buttonRef} onClick={send}>
            登録する
            </button>
        </div>
        <Link to='/accounts/register'>Register</Link>
        <Link to='/accounts/login'>ログインはこちら</Link>
      </div>
    </HomeLayout>
  );
}
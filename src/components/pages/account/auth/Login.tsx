import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { HomeLayout } from './../../../organisms/HomeLayout';

export const Login: React.FC = (props: any) => {
  const mailRef = useRef(document.createElement("input"));
  const buttonRef = useRef(document.createElement("button"));
  const [err, setErr] = useState("");

  const send = async () => {
    await axios.post('/api/v1/common/sessions/login',{
        email: mailRef.current.value
      })
      .then(res => res.data)
      .catch(err => setErr(err.response.data.errors[0]));

    if (!err) {
      props.history.push({
        pathname: "/accounts/send",
        state: {
          email: mailRef.current.value,
          text: 'ログイン'
        }
      });
    }
    return;
  }

  return (
    <HomeLayout>
      <div className="form">
        <div className="content">
          <div className="sub-header">
            <Link to='/'>
              <div className="sub-header_btn">
                <p>←</p>
              </div>
            </Link>
            <h1 className="sub-header_title">ログイン</h1>
          </div>
          <div className="err">{err}</div>
          <div className="mail-form">
            <label className="mail-form_label">メールアドレス</label>
            <input className="mail-form_input" ref={mailRef} type="text" placeholder="sample@sample.com" />
            <div className="mail-form_btn-container">
              <button className="mail-form_btn" ref={buttonRef} onClick={send}>
                認証コードを送信
                </button>
            </div>
            <Link to='/accounts/register'>
              <p className="regist-link">会員登録はこちら</p>
            </Link>
          </div>
        </div>
        <style jsx>{`
          *{
            margin:0;
            padding:0;
            border:0;
            outline:0;
            list-style:none;
          }
          a{
            text-decoration: none;
          }
          .container{
            width: 100%
          }
          // ヘッダー
          header{
            height: 56px;
            width: 100%;
            position: fixed;
            background: #FF8A1F;
            z-index: 100;
          }
          
          // 中身
          .content{
            position: relative;
            top: 56px;
            min-height: 100vh;
          }
          .sub-header{
            background: #FFFFFF;
            width: 100%;
            height: 40px;
            text-align: center;
            margin-bottom: 8px;
          }
          .sub-header_btn{
            width: 40px;
            height: 40px;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .sub-header_title{
            display: inline-block;
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            color: #333333;
            margin: 9px auto 7px auto;
          }

          .mail-form{
            max-width: 324px;
            width: 90%;
            margin: 0 auto;
          }
          .mail-form_label{
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            color: #8C8C8C;
            margin-bottom: 4px;
          }
          .mail-form_input{
            width: 100%;
            border: 1px solid #C0C0C0;
            box-sizing: border-box;
            border-radius: 4px;
            padding: 12px 10px;
            margin-bottom: 32px;
          }
          .mail-form_btn-container{
            margin: 0 auto 32px auto;
            width: fit-content;
          }
          .mail-form_btn{
            padding: 8px 32px;
            background: #FF8A1F;
            border-radius: 4px;
            font-size: 14px;
            font-weight: bold;
            color: #FFFFFF;
          }

          .regist-link{
            font-weight: bold;
            font-size: 14px;
            line-height: 24px;
            color: #333333;
            text-align: right;
          }
        `}</style>
      </div>
    </HomeLayout>
  );
}
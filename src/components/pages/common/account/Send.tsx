import React, { useRef, useState } from 'react';
// library
import axios from "axios";
import { Link } from 'react-router-dom';
// common
import CommonStyle from '../../../../common/CommonStyle';
import { RouteName } from '../../../../common/Const';
// components
import HomeLayout from '../../../templates/HomeLayout';
import Text, { TextThemes } from '../../../atoms/Text';
import Button, { ButtonThemes } from '../../../atoms/Button';

{/* FIXME 挙動ちゃんと確かめる */ }
const Send: React.FC = (props: any) => {
  const [resend, setResend] = useState("");
  const [err, setErr] = useState("");
  const resendPath =
    props.location.state.text === 'ログイン' ?
      'resend_login_email' :
      props.location.state.text === '登録' ?
        'resend_activation_email' :
        'resend_update_email'

  const send = async () => {
    try {
      await axios.post(`/api/v1/common/users/${resendPath}`, {
        email: props.location.state.email
      });
      setResend('メールを再送しました。');
      setErr('');
    } catch (error) {
      setErr('エラーが発生しました。もう一度お試しください。');
    }
  }

  return (
    <HomeLayout headerText={props.location.state.subTitle} prevRef='#' noBtn={true}>
      <div className="container">
        {resend && <Text theme={[TextThemes.ERROR, TextThemes.CAPTION]}>{resend}</Text>}
        {err && <Text theme={[TextThemes.ERROR, TextThemes.CAPTION]}>{err}</Text>}
        <Text theme={[TextThemes.CAPTION]}>{props.location.state.email} <span className="text">宛に認証メールを送信しました。</span></Text>
        <Text theme={[TextThemes.TEXT]}>メール内に記載されているリンクをクリックして{props.location.state.text}を完了してください。</Text>
        <div className="btns-container">
          <Button theme={[ButtonThemes.NORMAL]} onClick={send} propStyle={{ margin: '10px auto' }}>
            もう一度メールを送信する
          </Button>
          <Link to={RouteName.REGISTER_EMAIL}>
            <Button theme={[ButtonThemes.SUBNORMAL]} propStyle={{ margin: '10px auto' }}>
              メールアドレスを変更する
            </Button>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .container{
          max-width: 324px;
          width: 90%;
          margin: 30px auto;
        }
        .btns-container{
          margin-top: 30px;
        }
        .text{
          font-weight: initial;
          font-size: ${CommonStyle.Text};
          line-height: 1.7em;
        }
      `}</style>
    </HomeLayout>
  );
}

export default Send;
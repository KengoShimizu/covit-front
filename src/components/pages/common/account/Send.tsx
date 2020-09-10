import React, { useState } from 'react';
// library
import axios from "axios";
// common
import CommonStyle from '../../../../common/CommonStyle';
import { RouteName } from '../../../../common/Const';
// components
import HomeLayout from '../../../templates/HomeLayout';
import Text, { TextThemes } from '../../../atoms/Text';
import Button, { ButtonThemes } from '../../../atoms/Button';

const Send: React.FC = (props: any) => {
  const [resend, setResend] = useState("");
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);
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
      setSent(true)
      setErr('');
    } catch (error) {
      setErr('エラーが発生しました。もう一度お試しください。');
    }
  }

  const handleClick = () => {
    if(props.location.state.is_owner){
      props.history.push({
        pathname: RouteName.OWNER_REGISTER_EMAIL,
        state: {
          email: props.location.state.email,
        }
      });
    } else if (props.location.state.text === 'メールアドレスの変更'){ 
      props.history.push({
        pathname: RouteName.EDIT_EMAIL,
        state: {
          email: props.location.state.email,
        }
      });
    } else if (props.location.state.text === 'ログイン') {
      props.history.push({
        pathname: RouteName.LOGIN,
        state: {
          email: props.location.state.email,
        }
      });
    } else {
      props.history.push({
        pathname: RouteName.REGISTER_EMAIL,
        state: {
          email: props.location.state.email,
        }
      });
    }
  }

  return (
    <HomeLayout headerText={props.location.state.subTitle} noBtn={true}>
      <div className="container">
        {resend && <Text theme={[TextThemes.ERROR, TextThemes.CAPTION]}>{resend}</Text>}
        {err && <Text theme={[TextThemes.ERROR, TextThemes.CAPTION]}>{err}</Text>}
        <Text theme={[TextThemes.CAPTION]}>{props.location.state.email} <span className="text">宛に認証メールを送信しました。</span></Text>
        <Text theme={[TextThemes.TEXT]}>メール内に記載されているリンクをクリックして{props.location.state.text}を完了してください。</Text>
        <div className="btns-container">
          <Button theme={sent ? [ButtonThemes.SUBNORMAL] : [ButtonThemes.NORMAL]} onClick={sent ? () => {} : send} propStyle={{ margin: '10px auto' }}>
            もう一度メールを送信する
          </Button>
          <Button theme={[ButtonThemes.SUBNORMAL]} propStyle={{ margin: '10px auto' }} onClick={handleClick}>
            メールアドレスを変更する
          </Button>
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
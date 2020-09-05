import React, {  useState, useEffect } from 'react';
// library
import axios from "axios";
// common
import Validation from '../../../../common/Validate';
import { RouteName } from '../../../../common/Const';
// components
import NextRefBtn from '../../../molecules/NextRefBtn';
import HomeLayout from '../../../templates/HomeLayout';
import Button, { ButtonThemes } from '../../../atoms/Button';
import Input from '../../../atoms/Input';

interface AddParam {
  email: string;
}

const Login: React.FC = (props: any) => {
  const [err, setErr] = useState("");
  const [addData, setAddData] = useState<AddParam>({
    email: ""
  });

  const send = async () => {
    try {
      await axios.post('/api/v1/common/sessions/login', addData)
      props.history.push({
        pathname: RouteName.SEND,
        state: {
          email: addData.email,
          text: 'ログイン',
          subTitle: 'ログイン',
          ref: 'accounts/login'
        }
      });
    } catch (error) {
      setErr('エラーが発生しました。もう一度お試しください。')
    }
  }

  const handleChange = (event: any) => {
    setAddData({
      email: event.target.value
    });
  }

  useEffect(()=>{
    const errText = Validation.formValidate('email', addData.email);
    errText ? setErr(errText) : setErr('')
  },[addData])

  return (
    <HomeLayout headerText={'ログイン'} prevRef={RouteName.REGISTER}>
      <div className="form">
        <div className="content">
          <div className="mail-form">
            <Input label='メールアドレス' placeholder='sample@sample.com' content={addData.email} handleChange={handleChange}/>
            {/* {err && <Text theme={[TextThemes.ERROR]}>{err}</Text>} */}
            {err ?
              <div className="mail-form_btn-container">
                <Button theme={[ButtonThemes.SUBNORMAL]}>
                  認証コードを送信
                </Button>
              </div>
              :
              <div className="mail-form_btn-container">
                <Button theme={[ButtonThemes.NORMAL]} onClick={send}>
                  認証コードを送信
                </Button>
              </div>
            }
            <NextRefBtn nextRef={RouteName.REGISTER} text='会員登録はこちら'/>
          </div>
        </div>
        <style jsx>{`
          .mail-form{
            max-width: 324px;
            width: 90%;
            margin: 40px auto 0;
          }
          .mail-form_btn-container{
            margin: 0 auto 32px auto;
            width: fit-content;
          }
        `}</style>
      </div>
    </HomeLayout>
  );
}

export default Login;
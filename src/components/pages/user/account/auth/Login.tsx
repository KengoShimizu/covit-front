import React, {  useState, useEffect } from 'react';
// library
import axios from "axios";
// common
import Validation from './../../../../../common/Validate';
// components
import NextRefBtn from './../../../../molecules/NextRefBtn';
import HomeLayout from '../../../../templates/HomeLayout';
import Button, { ButtonThemes } from '../../../../atoms/Button';
import Text, { TextThemes } from '../../../../atoms/Text';
import Input from './../../../../atoms/Input';

interface AddParam {
  email: string;
}

export const Login: React.FC = (props: any) => {
  const [addData, setAddData] = useState<AddParam>({
    email: ""
  });
  const [err, setErr] = useState("");

  const send = () => {
      axios.post('/api/v1/common/sessions/login',{
          email: addData.email
        })
        .then(res => res.data)
        .catch(err => setErr(err.response.data.errors[0]));

      if (!err) {
        props.history.push({
          pathname: "/accounts/send",
          state: {
            email: addData.email,
            text: 'ログイン'
          }
        });
      }
      return;
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
    <HomeLayout headerText={'ログイン'} prevRef={'/accounts/register'} history={props.history}>
      <div className="form">
        <div className="content">
          <div className="mail-form">
            <Input label='メールアドレス' placeholder='sample@sample.com' content={addData.email} handleChange={handleChange}/>
            {err && <Text theme={[TextThemes.ERROR]}>{err}</Text>}
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
            <NextRefBtn nextRef='/accounts/register' text='会員登録はこちら'/>
          </div>
        </div>
        <style jsx>{`
          .mail-form{
            max-width: 324px;
            width: 90%;
            margin: 0 auto;
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
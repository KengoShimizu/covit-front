import React, { useState, useEffect } from 'react';
// library
import { Link } from 'react-router-dom';
import axios from "axios";
// common
import Validation from './../../../../../common/Validate';
// components
import HomeLayout from '../../../../templates/HomeLayout';
import NextRefBtn from './../../../../molecules/NextRefBtn';
import Input, { InputThemes } from '../../../../atoms/Input';
import Button, { ButtonThemes } from '../../../../atoms/Button';
import Text, { TextThemes } from '../../../../atoms/Text';

interface AddParam {
  email: string;
}

export const EmailRegister: React.FC = (props: any) => {
  const [err, setErr] = useState("");
  const [addData, setAddData] = useState<AddParam>({
    email: ""
  });

  const send = async () => {
    try {
      await axios.post('/api/v1/common/sessions/sign_up', addData)
      props.history.push({
        pathname: "/accounts/send",
        state: {
          email: addData.email,
          text: '登録',
          subTitle: 'メールアドレス登録',
          ref: '/accounts/emailregister'
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
    <HomeLayout headerText="メールアドレス登録" prevRef='/accounts/register'>
      {/* FIXME リンク先 */}
      <div className="form">
        <div className="content">
          <div className="mail-form">
            <Input label='メールアドレス' placeholder='sample@sample.com' content={addData.email} handleChange={handleChange}/>
            {err && <Text theme={[TextThemes.ERROR]}>{err}</Text>}
            {err ?
              <div className="mail-form_btn-container">
                <Button theme={[ButtonThemes.SUBNORMAL]}>
                  登録する
                </Button>
              </div>
              :
              <div className="mail-form_btn-container">
                <Button theme={[ButtonThemes.NORMAL]} onClick={send}>
                  登録する
                </Button>
              </div>
            }
            <NextRefBtn nextRef='/accounts/login' text='ログインはこちら'/>
          </div>
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
    </HomeLayout>
  );
}
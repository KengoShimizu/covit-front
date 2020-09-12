import React, { useState, useEffect } from 'react';
// library
import axios from "axios";
// common
import Validation from './../../../../../common/Validate';
import { RouteName } from '../../../../../common/Const';
// components
import HomeLayout from '../../../../templates/HomeLayout';
import NextRefBtn from './../../../../molecules/NextRefBtn';
import Input from '../../../../atoms/Input';
import Button, { ButtonThemes } from '../../../../atoms/Button';
import Text, { TextThemes } from './../../../../atoms/Text';

interface AddParam {
  email: string;
  is_owner: number;
}

const OwnerEmailRegister: React.FC = (props: any) => {
  const [err, setErr] = useState("");
  const [isOK, setIsOK] = useState(false);
  const [addData, setAddData] = useState<AddParam>({
    email: "",
    is_owner: 1,
  });

  const send = async () => {
    try {
      setIsOK(false)
      await axios.post('/api/v1/common/sessions/sign_up', addData)
      props.history.push({
        pathname: RouteName.SEND,
        state: {
          email: addData.email,
          is_owner: addData.is_owner,
          text: '登録',
          subTitle: 'メールアドレス登録',
          ref: RouteName.REGISTER_EMAIL
        }
      });
    } catch (error) {
      if (error.message.match(/400/g)) {
        setErr('既に登録されたメールアドレスです。')
      } else {
        setErr('エラーが発生しました。もう一度お試しください。')
      }
    }
  }

  const handleChange = (event: any) => {
    setAddData({
      ...addData,
      email: event.target.value
    });
  }

  useEffect(()=>{
    if(Validation.formValidate('email', addData.email)) setIsOK(false);
    else setIsOK(true);
  },[addData])

  useEffect(() => {
    if (props.location.state) {
      setAddData({
        ...addData,
        email: props.location.state.email,
      });
    }
  }, [])

  return (
    <HomeLayout headerText="オーナー様会員登録" prevRef={RouteName.REQUEST_TOP}>
      <div className="form">
        <div className="content">
          <div className="mail-form">
            <Input label='メールアドレス' placeholder='sample@sample.com' content={addData.email} handleChange={handleChange} propStyle={{marginBottom: '24px'}}/>
            {err && <Text theme={[TextThemes.ERROR]}>{err}</Text>}
            <div className="mail-form_btn-container">
              <Button 
                theme={isOK ? [ButtonThemes.NORMAL] : [ButtonThemes.SUBNORMAL]}
                onClick={isOK ? send : () => {}}>
                登録する
              </Button>
            </div>
            <NextRefBtn nextRef={RouteName.LOGIN} text='ログインはこちら'/>
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

export default OwnerEmailRegister;
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
import Text, { TextThemes } from '../../../atoms/Text';
import Input from '../../../atoms/Input';

interface AddParam {
  email: string;
}

const Login: React.FC = (props: any) => {
  const [isOK, setIsOK] = useState(false);
  const [addData, setAddData] = useState<AddParam>({
    email: ""
  });

  const send = async () => {
    try {
      await axios.post('/api/v1/common/sessions/login', addData)
      setIsOK(false)
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
      console.log(error)
    }
  }

  const handleChange = (event: any) => {
    setAddData({
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
        email: props.location.state.email,
      });
    }
  }, [])

  return (
    <HomeLayout headerText={'ログイン'} prevRef={RouteName.REGISTER}>
      <div className="form">
        <div className="content">
          <div className="mail-form">
            <Input label='メールアドレス' placeholder='sample@sample.com' content={addData.email} handleChange={handleChange}/>
            <div className="mail-form_btn-container">
              <Button theme={isOK ? [ButtonThemes.NORMAL] : [ButtonThemes.SUBNORMAL]} onClick={isOK ? send : () => {}}>
                認証コードを送信
              </Button>
            </div>
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
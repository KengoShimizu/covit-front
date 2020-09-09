import React, { useState, useContext, useEffect } from 'react';
// components
import HomeLayout from '../../../../templates/HomeLayout';
import CommonStyle from '../../../../../common/CommonStyle';
import LoginFlexCard from '../../../../molecules/Card/LoginFlexCard';
// common
import { RouteName } from '../../../../../common/Const';
// context
import AuthContext from "../../../../../context/CommonProvider";

const EditLogin: React.FC = (props: any) => {
  const [loginWay, setLoginWay] = useState('');
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    authState.user.authorizations.length === 0 ? 
      setLoginWay('email')
      : authState.user.authorizations[0].provider === 'google_oauth2' ?
        setLoginWay('google')
        : authState.user.authorizations[0].provider === 'twitter' ?
          setLoginWay('twitter')
          : setLoginWay('facebook')
  }, [authState])

  return (
    <HomeLayout headerText='ログイン情報の編集' prevRef={RouteName.ACCOUNT_TOP}>
        <div className='container'>
          <ul>
            <LoginFlexCard src={'/twitter.png'} text={'Twitter'} loginWay={loginWay === 'twitter'}/>
            <hr className="sub-hr"/>
            <LoginFlexCard src={'/google.png'} text={'Google'} loginWay={loginWay === 'google'}/>
            <hr className="sub-hr"/>
            <LoginFlexCard src={'/facebook.png'} text={'Facebook'} loginWay={loginWay === 'facebook'}/>
            <hr className="main-hr"/>
            <LoginFlexCard src={'/mail.png'} text={'メールアドレス'} nextRef={RouteName.EDIT_EMAIL} loginWay={loginWay === 'email'}/>
          </ul>
          
          <style jsx>{`
          .container{
            width: 100%;
            min-height: 100vh;
            padding-top: 24px;
          }
          .sub-hr{
            width: 340px;
            margin: 0 auto 16px auto;
            height: 2px;
            background: ${CommonStyle.BgGray}
          }
          .main-hr{
            width: 100%;
            height: 8px;
            background: ${CommonStyle.BgGray}
          }
        `}</style>
        </div>
      </HomeLayout>
  );
}

export default EditLogin;
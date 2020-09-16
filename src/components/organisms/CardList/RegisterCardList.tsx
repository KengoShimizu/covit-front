import React from 'react';
// library
import queryString from 'query-string';
// common
import { RedirectFrom, RouteName } from './../../../common/Const';
// components
import RegisterCard from '../../molecules/Card/RegisterCard';
import NextRefBtn from '../../molecules/NextRefBtn';
import NotifyCard from './../../molecules/Card/NotifyCard';

const RegisterCardList: React.FC<{query: any}> = ({query}) => {
  const qs = queryString.parse(query);
  return (
    <div className="container">
      <div className="mb40"></div>
      {qs.from === RedirectFrom.SHOP_SEARCH && <NotifyCard line_1='会員登録をすると' line_2='お店の名前検索ができます！'/>}
      {qs.from === RedirectFrom.HISTORY && <NotifyCard line_1='会員登録をすると' line_2='閲覧履歴を確認できます！'/>}
      <RegisterCard src='/twitter.png' text='Twitterで登録・ログイン' className='twitter' nextRef={`${process.env.REACT_APP_API_END_POINT}/auth/twitter`}/>
      <RegisterCard src='/google.png' text='Googleで登録・ログイン' className='google' nextRef={`${process.env.REACT_APP_API_END_POINT}/auth/google_oauth2`}/>
      <RegisterCard src='/facebook.png' text='Facebookで登録・ログイン' className='facebook' nextRef={`${process.env.REACT_APP_API_END_POINT}/auth/facebook`}/>
      <div className="email-container">
        <RegisterCard src='/mail.png' text='メールアドレスで登録' className='email' nextRef={RouteName.REGISTER_EMAIL}/>
      </div>
      <NextRefBtn nextRef={RouteName.LOGIN} text='ログインはこちら'/>
      <style jsx>{`
        .container{
          max-width: 324px;
          width: 90%;
          margin: 0 auto 40px auto;
        }
        .email-container{
          margin-top: 50px;
        }
        .mb40{
          margin-bottom: 40px;
        }
      `}</style>
    </div>
  );
}

export default RegisterCardList;
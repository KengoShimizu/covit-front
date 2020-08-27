import React from 'react';
import { RegisterCard } from '../molecules/Card/RegisterCard';
import { NextRefBtn } from '../molecules/NextRefBtn';

interface RegisterCardListProps {
}

export const RegisterCardList: React.FC<RegisterCardListProps> = ({}) => {

  return (
    <div className="container">
      <RegisterCard src='/twitter.png' text='Twitterで登録・ログイン' className='twitter'/>
      <RegisterCard src='/google.png' text='Googleで登録・ログイン' className='google'/>
      <RegisterCard src='/facebook.png' text='Facebookで登録・ログイン' className='facebook'/>
      <div className="email-container">
        <RegisterCard src='/mail.png' text='メールアドレスで登録' className='email'/>
      </div>
      <NextRefBtn nextRef='/accounts/login' text='ログインはこちら'/>
      <div className="mb30"/>
      <NextRefBtn nextRef='/accounts/login' text='お店のオーナー様はこちら'/>
      <style jsx>{`
        .container{
          max-width: 324px;
          width: 90%;
          margin: 0 auto;
        }
        .email-container{
          margin-top: 50px;
        }
        .mb30{
          margin-bottom: 30px;
        }
      `}</style>
    </div>
  );
}
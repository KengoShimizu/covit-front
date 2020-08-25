import React from 'react';
import { Link } from 'react-router-dom';
import { HomeLayout } from '../../../../templates/HomeLayout';
import {CommonStyle} from '../../../../../common/CommonStyle';
import Input, { InputThemes } from '../../../../atoms/Input';
import { LoginFlexCard } from '../../../../molecules/LoginFlexCard';

export const EditLogin: React.FC = () => {
  return (
    <HomeLayout subHeaderText='ログイン情報の編集' prevRef='/'>
        <div className='container'>
          <ul>
            <LoginFlexCard src={'/facebook.png'} text={'Twitter'} />
            <hr className="sub-hr"/>
            <LoginFlexCard src={'/google.png'} text={'Google'} />
            <hr className="sub-hr"/>
            <LoginFlexCard src={'/facebook.png'} text={'Facebook'} />
            <hr className="main-hr"/>
            <LoginFlexCard src={'/mail.png'} text={'メールアドレス'} />
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
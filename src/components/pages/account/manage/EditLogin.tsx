import React from 'react';
import { Link } from 'react-router-dom';
import { HomeLayout } from '../../../templates/HomeLayout';
import {CommonStyle} from './../../../../common/CommonStyle';
import Input, { InputThemes } from '../../../atoms/Input';
import { LoginFlexCard } from './../../../molecules/LoginFlexCard';
import Twitter from './../../../../img/twitter.png';
import Google from './../../../../img/googlr.png';
import Facebook from './../../../../img/facebook.png';
import Mail from './../../../../img/mail.png';

export const EditLogin: React.FC = () => {
  return (
    <HomeLayout subHeaderText='ログイン情報の編集' prevRef='/'>
        <div className='container'>
          <ul>
            <LoginFlexCard src={Twitter} text={'Twitter'} />
            <hr className="sub-hr"/>
            <LoginFlexCard src={Google} text={'Google'} />
            <hr className="sub-hr"/>
            <LoginFlexCard src={Facebook} text={'Facebook'} />
            <hr className="main-hr"/>
            <LoginFlexCard src={Mail} text={'メールアドレス'} />
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
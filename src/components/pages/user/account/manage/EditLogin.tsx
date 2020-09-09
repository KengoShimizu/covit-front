import React from 'react';
// components
import HomeLayout from '../../../../templates/HomeLayout';
import CommonStyle from '../../../../../common/CommonStyle';
import LoginFlexCard from '../../../../molecules/Card/LoginFlexCard';
// common
import { RouteName } from '../../../../../common/Const';

const EditLogin: React.FC = (props: any) => {
  return (
    <HomeLayout headerText='ログイン情報の編集' prevRef={RouteName.ACCOUNT_TOP}>
        <div className='container'>
          <ul>
            <LoginFlexCard src={'/twitter.png'} text={'Twitter'} />
            <hr className="sub-hr"/>
            <LoginFlexCard src={'/google.png'} text={'Google'} />
            <hr className="sub-hr"/>
            <LoginFlexCard src={'/facebook.png'} text={'Facebook'} />
            <hr className="main-hr"/>
            <LoginFlexCard src={'/mail.png'} text={'メールアドレス'} nextRef={RouteName.EDIT_EMAIL}/>
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
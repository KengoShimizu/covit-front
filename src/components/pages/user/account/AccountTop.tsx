import React, { useState, useContext } from 'react';
// components
import ProfileIconNameCard from './../../../molecules/Card/ProfileIconNameCard'
import HomeLayout from '../../../templates/HomeLayout';
import NextRefBtn from './../../../molecules/NextRefBtn';
import { AccountTopCardList } from '../../../organisms/CardList/AccoutTopCardList';
// context
import AuthContext from "../../../../context/CommonProvider";

export const AccountTop: React.FC = (props: any) => {
  const { authState } = useContext(AuthContext);
  const [account] = useState(authState.user);

  return (
    <HomeLayout headerText={'ユーザ情報'} prevRef={'/'} history={props.history}>
      <ProfileIconNameCard src={account.image} name={account.name}/>
      <div className="next-ref-btn">
      <NextRefBtn nextRef='/accounts/editprofile' text='プロフィールを編集'/>
      </div>
      <AccountTopCardList history={props.history}/>

      <ul className="privacy_container">
        <li className="privacy_text">プライバシー</li>
        <li className="privacy_text">サービス名 © ︎2020</li>
      </ul>
      <style jsx>{`
        .next-ref-btn{
          position: absolute;
          top: 120px;
          right: 10px;
        }
        //プライバシー
        .privacy_container{
          text-align: center;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          -webkit- transform: translateX(-50%);
          bottom: 48px;
          top: auto;
        }
        .privacy_text{
          font-weight: bold;
          font-size: 14px;
          color: #8C8C8C;
          margin-bottom: 12px;
        }
      `}</style>
    </HomeLayout>
  );
}
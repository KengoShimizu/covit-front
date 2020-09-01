import React, { useState, useContext } from 'react';
// components
import PrivacyFotter from './../../../molecules/Footer/PrivacyFotter';
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
      <ProfileIconNameCard src={account.image} name={account.name} />
      <div className="next-ref-btn">
        <NextRefBtn nextRef='/accounts/editprofile' text='プロフィールを編集' />
      </div>
      <AccountTopCardList history={props.history} />
      <PrivacyFotter/>
      <style jsx>{`
        .next-ref-btn{
          position: absolute;
          top: 65px;
          right: 10px;
        }
      `}</style>
    </HomeLayout>
  );
}
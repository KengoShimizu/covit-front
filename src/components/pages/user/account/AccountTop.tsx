import React, { useState, useContext } from 'react';
// components
import PrivacyFotter from './../../../molecules/Footer/PrivacyFotter';
import ProfileIconNameCard from './../../../molecules/Card/ProfileIconNameCard'
import HomeLayout from '../../../templates/HomeLayout';
import NextRefBtn from './../../../molecules/NextRefBtn';
import { AccountTopCardList } from '../../../organisms/CardList/AccoutTopCardList';
import TopModal from '../../../molecules/Modal/TopModal';
// context
import AuthContext from "../../../../context/CommonProvider";
// common
import { RouteName } from './../../../../common/Const';
import FooterActionBar from './../../../organisms/FooterActionBar';

const AccountTop: React.FC = (props: any) => {
  const { authState } = useContext(AuthContext);
  const [account] = useState(authState.user);

  return (
    <HomeLayout headerText={'ユーザ情報'} prevRef={RouteName.ROOT} title={`covEAT/こびイート | ${account.name}さんのマイページ`}>
      <TopModal />
      <div className="profile-head_container">
        <div className="profile-head_name">
          <ProfileIconNameCard src={account.image} name={account.name} styleImg={{marginRight: '8px'}}/>
        </div>
        <div className="profile-head-btn">
          <NextRefBtn nextRef={RouteName.EDIT_PROFILE} text='プロフィールを編集'/>
        </div>
      </div>
      
      <AccountTopCardList history={props.history} user_id={account.id} />
      <PrivacyFotter />
      <FooterActionBar initialAccent={4} />
      <style jsx>{`
        .profile-head_container{
          max-width: 400px;
          width: 100%;
          box-sizing: border-box;
          padding: 0 20px;
          margin: 16px auto 20px auto;
        }
      `}</style>
    </HomeLayout>
  );
}

export default AccountTop;
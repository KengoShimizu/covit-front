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
import AccountTopCard from './../../../molecules/Card/ProfileIconNameCard';

const AccountTop: React.FC = (props: any) => {
  const { authState } = useContext(AuthContext);
  const [account] = useState(authState.user);

  return (
    <HomeLayout headerText={'ユーザ情報'} prevRef={RouteName.ROOT} history={props.history}>
      <TopModal />
      <div className="profile-head">
        <ProfileIconNameCard src={account.image} name={account.name} />
      </div>
      <div className="next-ref-btn">
        <NextRefBtn nextRef={RouteName.EDIT_PROFILE} text='プロフィールを編集' />
      </div>
      <AccountTopCardList history={props.history} user_id={account.id} />
      <PrivacyFotter />
      <style jsx>{`
        .profile-head{
          margin-top: 50px;
        }
        .next-ref-btn{
          position: absolute;
          top: 105px;
          right: 10px;
        }
      `}</style>
    </HomeLayout>
  );
}

export default AccountTop;
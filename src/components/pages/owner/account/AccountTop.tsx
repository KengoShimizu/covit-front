import React, { useState, useContext, useEffect } from 'react';
// components
import PrivacyFotter from './../../../molecules/Footer/PrivacyFotter';
import ProfileIconNameCard from './../../../molecules/Card/ProfileIconNameCard'
import HomeLayout from '../../../templates/HomeLayout';
import NextRefBtn from './../../../molecules/NextRefBtn';
import { AccountTopCardList } from '../../../organisms/CardList/AccoutTopCardList';
import TopModal from '../../../molecules/Modal/TopModal';
// context
import AuthContext from "../../../../context/CommonProvider";
import TopModalContext from '../../../../context/TopModalContext';
// common
import { RouteName } from './../../../../common/Const';

const OwnerAccountTop: React.FC = (props: any) => {
  const { authState } = useContext(AuthContext);
  const topModalContext = useContext(TopModalContext);
  const [account] = useState(authState.user);

  useEffect(() => {
    if (topModalContext.contents.isShown){
      setTimeout(() => {
        topModalContext.setContents({
          isShown: false,
          text: {
            caption: ''
          }
        })
      }, 3000)
    }
  }, [topModalContext.contents.isShown]);

  return (
    <HomeLayout headerText={'マイページ'} prevRef='#' noBtn={true}>
      <TopModal/>
      <ProfileIconNameCard src={account.image} name={account.name} />
      <div className="next-ref-btn">
        <NextRefBtn nextRef={RouteName.EDIT_PROFILE} text='プロフィールを編集' />
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

export default OwnerAccountTop;
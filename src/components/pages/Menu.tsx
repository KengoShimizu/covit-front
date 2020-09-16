import React from 'react';
// library
import { HelpCircle } from 'react-feather';
// common
import CommonStyle from './../../common/CommonStyle';
import { RouteName } from './../../common/Const';
// components
import PrivacyFotter from './../molecules/Footer/PrivacyFotter';
import HomeLayout from './../templates/HomeLayout';
import RegisterCardList from './../organisms/CardList/RegisterCardList';
import AccountTopCard from './../molecules/Card/AccoutTopCard';
import OverLayNend from '../common/OverLayNend';

const Menu: React.FC = (props: any) => {
  return (
    <HomeLayout headerText='メニュー' prevRef={RouteName.ROOT}>
      <RegisterCardList query={props.location.search}/>
      <div className="about">
        <AccountTopCard icon={<HelpCircle size={20} color={CommonStyle.AccentColor}/>} text='covEATについて' nextRef={RouteName.LANDING_PAGE}/>
        <AccountTopCard icon={<HelpCircle size={20} color={CommonStyle.AccentColor}/>} text='お店のオーナー様はこちら' nextRef={RouteName.REQUEST_TOP}/>
      </div>
      <PrivacyFotter/>
      <OverLayNend media={65737} site={342425} spot={1014046} type={2} oriented={1} id={'menu'}/>
      <style jsx>{`
        .about{
          width: 90%;
          max-width: 324px;
          margin: 0 auto 0 auto;
        }
      `}</style>
    </HomeLayout>
  );
}

export default Menu;
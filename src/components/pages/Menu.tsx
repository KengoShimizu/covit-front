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
import { Route } from 'react-router-dom';

export const Menu: React.FC = (props: any) => {
  return (
    <HomeLayout headerText='メニュー' prevRef={RouteName.ROOT} history={props.history}>
      <RegisterCardList query={props.location.search}/>
      <div className="about">
        <AccountTopCard icon={<HelpCircle size={20} color={CommonStyle.AccentColor}/>} text='covEATについて' nextRef={RouteName.LANDING_PAGE}/>
        <AccountTopCard icon={<HelpCircle size={20} color={CommonStyle.AccentColor}/>} text='お店のオーナー様はこちら'/>
      </div>
      <PrivacyFotter/>
      <style jsx>{`
        .about{
          margin-top: 40px;
        }
      `}</style>
    </HomeLayout>
  );
}
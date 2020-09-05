import React from 'react';
// library
import { HelpCircle } from 'react-feather';
// common
import CommonStyle from '../../../../common/CommonStyle';
import { RouteName } from '../../../../common/Const';
// components
import HomeLayout from '../../../templates/HomeLayout';
import RegisterCardList from '../../../organisms/CardList/RegisterCardList';
import AccountTopCard from '../../../molecules/Card/AccoutTopCard';

const Register: React.FC = (props: any) => {
  return (
    <HomeLayout headerText='会員登録・ログイン' prevRef={RouteName.ROOT} history={props.history}>
      <RegisterCardList query={props.location.search}/>
      <div className="about">
        <AccountTopCard icon={<HelpCircle size={20} color={CommonStyle.AccentColor}/>} text='お店のオーナー様はこちら' nextRef={RouteName.REQUEST_TOP}/>
      </div>
      <style jsx>{`
        .about{
          position: absolute;
          left: 10px;
          -webkit- transform: translateX(-50%);
          bottom: 44px;
        }
      `}</style>
    </HomeLayout>
  );
}

export default Register;
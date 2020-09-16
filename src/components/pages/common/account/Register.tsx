import React from 'react';
// library
import { HelpCircle } from 'react-feather';
import queryString from 'query-string';
// common
import CommonStyle from '../../../../common/CommonStyle';
import { RouteName } from '../../../../common/Const';
// components
import HomeLayout from '../../../templates/HomeLayout';
import RegisterCardList from '../../../organisms/CardList/RegisterCardList';
import AccountTopCard from '../../../molecules/Card/AccoutTopCard';
import InlineNend from './../../../common/InlineNend';

const Register: React.FC = (props: any) => {
  const qs = queryString.parse(props.location.search);
  return (
    <HomeLayout headerText='会員登録・ログイン' prevRef={qs.shop ? `/shops/${qs.shop}` : RouteName.ROOT}>
      <RegisterCardList query={props.location.search}/>
      <div className="about">
        <AccountTopCard icon={<HelpCircle size={20} color={CommonStyle.AccentColor}/>} text='お店のオーナー様はこちら' nextRef={RouteName.REQUEST_TOP}/>
      </div>
      <InlineNend media={65737} site={342425} spot={1014050} type={1} oriented={1} id={'register'} height={150} width={300}/>
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
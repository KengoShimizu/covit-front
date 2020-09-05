import React from 'react';
// common
import CommonStyle from './../../common/CommonStyle';
import { RouteName } from './../../common/Const';
// components
import HomeLayout from './../templates/HomeLayout';

const NotFound: React.FC = (props: any) => {
  return (
    <HomeLayout headerText='存在しないページ' prevRef={RouteName.ROOT}>
      存在しません。
    </HomeLayout>
  );
}

export default NotFound;
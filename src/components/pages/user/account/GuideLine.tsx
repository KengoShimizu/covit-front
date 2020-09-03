import React from 'react';
// library
import { Link } from 'react-router-dom';
// common
import { RouteName } from './../../../../common/Const';
// components
import HomeLayout from '../../../templates/HomeLayout';


const GuideLine: React.FC = (props: any) => {
  return (
    <HomeLayout headerText="口コミ投稿のガイドライン" prevRef='#' history={props.history}>
    </HomeLayout>
  );
}

export default GuideLine;
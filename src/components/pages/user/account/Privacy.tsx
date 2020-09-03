import React from 'react';
// library
import { Link } from 'react-router-dom';
// common
import { RouteName } from './../../../../common/Const';
// components
import HomeLayout from '../../../templates/HomeLayout';


export const Privacy: React.FC = (props: any) => {
  return (
    <HomeLayout headerText="プライバシーポリシー" prevRef='#' history={props.history}>
    </HomeLayout>
  );
}
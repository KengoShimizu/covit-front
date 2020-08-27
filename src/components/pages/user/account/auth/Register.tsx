import React from 'react';
import { HomeLayout } from '../../../../templates/HomeLayout';
import { RegisterCardList } from './../../../../organisms/RegisterCardList';

export const Register: React.FC = () => {
  return (
    <HomeLayout subHeaderText='会員登録・ログイン' prevRef='/'>
      <RegisterCardList/>
    </HomeLayout>
  );
}
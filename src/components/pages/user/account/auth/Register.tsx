import React from 'react';
// components
import HomeLayout from '../../../../templates/HomeLayout';
import RegisterCardList from '../../../../organisms/CardList/RegisterCardList';

export const Register: React.FC = (props: any) => {
  return (
    <HomeLayout headerText='会員登録・ログイン' prevRef='/' history={props.history}>
      <RegisterCardList query={props.location.search}/>
    </HomeLayout>
  );
}
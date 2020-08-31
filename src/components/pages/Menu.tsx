import React from 'react';
// components
import HomeLayout from './../templates/HomeLayout';
import RegisterCardList from './../organisms/CardList/RegisterCardList';

export const Menu: React.FC = (props: any) => {
  return (
    <HomeLayout headerText='メニュー' prevRef='/' history={props.history}>
      <RegisterCardList query={props.location.search}/>
    </HomeLayout>
  );
}
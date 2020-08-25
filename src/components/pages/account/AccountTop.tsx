import React from 'react';
import { CommonStyle } from './../../../common/CommonStyle';
import { Link } from 'react-router-dom';
import { HomeLayout } from '../../templates/HomeLayout';
import { SubHeader } from './../../molecules/SubHeader';
import Button, { ButtonThemes } from './../../atoms/Button';
import Title, { TitleThemes } from './../../atoms/Title';
import { ChevronLeft } from 'react-feather';

export const AccountTop: React.FC = () => {
  return (
    <HomeLayout>
      <div className="">
        <SubHeader>
          <Link to='/'>
            <Button theme={[ButtonThemes.SUBHEADER]}>
              <ChevronLeft size={24} color="#333" />
            </Button>
          </Link>
          <Title theme={[TitleThemes.SUBHEADER]}>
            ユーザ情報
          </Title>
        </SubHeader>

        <br />
        <Link to='/history'>閲覧履歴</Link>
        <br />
        <Link to='/accounts/:id/editlogin'>ログイン情報の編集</Link>
        <br />
        <Link to='/accounts/logout'>Logout</Link>
        <br />
        <Link to='/accounts/privacy'>Privacy</Link>
        <br />
        <Link to='/accounts/:id/delete'>Delete</Link>
      </div>
      <style jsx>{`
      `}</style>
    </HomeLayout>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { HomeLayout } from '../../../templates/HomeLayout';
import Input, { InputThemes } from '../../../atoms/Input'
import { Edit2 } from 'react-feather';

export const EditProfile: React.FC = () => {
  return (
    <HomeLayout>
      <Input theme={InputThemes.REQUIRED} label="ニックネーム" placeholder="おなまえ" content="" icon={<Edit2 color="black" />}></Input>
      <Link to='/accounts/:id/accounttop'>AccountTop</Link>
    </HomeLayout>
  );
}
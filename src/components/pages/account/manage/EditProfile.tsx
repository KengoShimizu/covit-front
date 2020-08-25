import React from 'react';
import { Link } from 'react-router-dom';
import { HomeLayout } from '../../../templates/HomeLayout';
import Form, { FormThemes } from '../../../atoms/Form'
import { Edit2 } from 'react-feather';

export const EditProfile: React.FC = () => {
  return (
    <HomeLayout>
      <Form theme={FormThemes.REQUIRED} label="ニックネーム" placeholder="おなまえ" content="" icon={<Edit2 color="black" />}></Form>
      <Link to='/accounts/:id/accounttop'>AccountTop</Link>
    </HomeLayout>
  );
}
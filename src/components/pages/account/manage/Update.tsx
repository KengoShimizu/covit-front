import React from 'react';
import { Link } from 'react-router-dom';
import { HomeLayout } from './../../../organisms/HomeLayout';

export const Update: React.FC = () => {
  return (
    <HomeLayout>
      <Link to='/accounts/:id/accounttop'>AccountTop</Link>
    </HomeLayout>
  );
}
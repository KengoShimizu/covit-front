import React from 'react';
import { Link } from 'react-router-dom';
import { HomeLayout } from '../../../templates/HomeLayout';

export const ProfileRegister: React.FC = () => {
  return (
    <HomeLayout>
      <div>
        <Link to='/'>Top</Link>
        <br />
        <Link to='/accounts/:id/accounttop'>AccountTop</Link>
      </div>
    </HomeLayout>
  );
}
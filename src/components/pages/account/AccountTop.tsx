import React from 'react';
import { Link } from 'react-router-dom';
import { HomeLayout } from './../../organisms/HomeLayout';

export const AccountTop: React.FC = () => {
  return (
    <HomeLayout>
      <div>
        <Link to='/'>Top</Link>
        <br />
        <Link to='/history'>History</Link>
        <br />
        <Link to='/accounts/:id/update'>Update</Link>
        <br />
        <Link to='/accounts/logout'>Logout</Link>
        <br />
        <Link to='/accounts/privacy'>Privacy</Link>
        <br />
        <Link to='/accounts/:id/delete'>Delete</Link>
      </div>
    </HomeLayout>
  );
}
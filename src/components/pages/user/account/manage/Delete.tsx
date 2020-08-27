import React from 'react';
import { Link } from 'react-router-dom';
import { HomeLayout } from '../../../../templates/HomeLayout';

export const Delete: React.FC = (props: any) => {
  return (
    <HomeLayout history={props.history}>
      <Link to='/accounts/:id/accounttop'>AccountTop</Link>
    </HomeLayout>
  );
}
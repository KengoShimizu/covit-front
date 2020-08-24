import React from 'react';
import {CommonStyle} from './../../../../common/CommonStyle';
import { Link } from 'react-router-dom';
import { HomeLayout } from '../../../templates/HomeLayout';

export const Register: React.FC = () => {
  return (
    <HomeLayout>
      <div>
        <Link to='/'>Top</Link>
        <br />
        <Link to='/accounts/emailregister'>EmailRegister</Link>
      </div>
    </HomeLayout>
  );
}
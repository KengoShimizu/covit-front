import React from 'react';
// library
import { Link } from 'react-router-dom';
// components
import HomeLayout from '../../../templates/HomeLayout';


export const Privacy: React.FC = () => {
    return (
        <HomeLayout>
          <div>
            <Link to='/'>Top</Link>
            <br/>
            <Link to='/accounts/:id/accounttop'>AccountTop</Link>
          </div>
        </HomeLayout>
    );
}
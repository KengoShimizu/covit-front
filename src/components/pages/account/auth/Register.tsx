import React from 'react';
import { Link } from 'react-router-dom';

export const Register: React.FC = () => {
    return (
        <div>
            <Link to='/'>Top</Link>
            <br/>
            <Link to='/accounts/emailregister'>EmailRegister</Link>
        </div>
    );
}
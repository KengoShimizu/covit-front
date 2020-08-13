import React from 'react';
import { Link } from 'react-router-dom';

export const Comments: React.FC = () => {
    return (
        <div>
            <Link to='/'>Top</Link>
            <br/>
            <Link to='/accounts/:id/accounttop'>AccountTop</Link>
        </div>
    );
}
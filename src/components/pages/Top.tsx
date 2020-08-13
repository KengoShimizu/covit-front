import React from 'react';
import { Link } from 'react-router-dom';

export const Top: React.FC = () => {
    return (
        <div>
            <Link to='/accounts/:id/accounttop'>AccountTop</Link>
            <br/>
            <Link to='/accounts/register'>Register</Link>
            <br/>
            <Link to='/history'>History</Link>
            <br/>
            <Link to='/shops/:id/comment'>Comment</Link>
            <br/>
            <Link to='/shops/:id/reputations'>Reputations</Link>
        </div>
    );
}
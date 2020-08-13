import React from 'react';
import { Link } from 'react-router-dom';

export const Top: React.FC = () => {
    return (
        <div>
            <Link to='/accounts/register'>Register</Link>
            <Link to='/history'>History</Link>
            <Link to='/shops/:id/comment'>Comment</Link>
            <Link to='/shops/:id/reputations'>Reputations</Link>
        </div>
    );
}
import React from 'react';
import { Link } from 'react-router-dom';

export const Delete: React.FC = () => {
    return (
        <Link to='/accounts/:id/accounttop'>AccountTop</Link>
    );
}
import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

export default function LogOut({ setToken, setUser }) {
    setToken('');
    setUser('');
    return (
        <Navigate to='/' />
    );
}
LogOut.propTypes = {
    setToken: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired
};

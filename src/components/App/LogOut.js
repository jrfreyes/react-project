import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

export default function LogOut({ onLogout }) {
    useEffect(onLogout, [onLogout])
    return <Navigate to='/' />;
}

LogOut.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

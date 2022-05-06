import React from 'react';
import PropTypes from 'prop-types';
import {
    Outlet, useNavigate,
    Link
} from 'react-router-dom';

export default function Contents({ user }) {

    let navigate = useNavigate();

    const sections = [
        { 'name': 'Health Data', 'path': '/HealthData' },
        { 'name': 'Recommendations', 'path': '/Recommendations' },
        { 'name': 'Statistics', 'path': '/Statistics' },
        { 'name': 'Pill Intake', 'path': '/PillIntake' },
    ];

    return (
        <div className='App'>
            <div className='User'>
                <img src='/images/logo.png' alt='' />
                <br />
                <div className='center'>
                    <p>Hello {user}</p>
                </div>
                <div className='center'>
                    <Link to='/LogOut'>Log Out</Link>
                </div>
            </div>
            <div className='Contents'>
                <nav className='Navigation'>
                    {sections.map(section => (
                        <button key={section.name} onClick={() => navigate(section.path)}>{section.name}</button>
                    ))}
                </nav>

                <Outlet />
            </div>
        </div>
    );
}
Contents.propTypes = {
    user: PropTypes.any
};

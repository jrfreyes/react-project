import './App.css';
import Login from './Login';
import HealthData from './HealthData';
import Recommendations from './Recommendations';
import useToken from './useToken';
import React, { useState } from 'react';
import { 
    Routes,
    Route,
    Outlet,
    Navigate,
    useNavigate,
} from 'react-router-dom';

export default function App() {
    const {token, setToken} = useToken();

    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
        <Routes>
            <Route path='/' element={<Contents />}>
                <Route path='HealthData' element={<HealthData />}/>
                <Route path='Recommendations' element={<Recommendations />}/>
                <Route path='Statistics' element={<Statistics />} />
                <Route path='PillIntake' element={<PillIntake />} />
                <Route index element={<Navigate to='/HealthData' replace />} />
                <Route path='*' element={<NoMatch />} />
            </Route>
        </Routes>
    )
}

function Contents() {
    
    let navigate = useNavigate();

    function handleClick(path) {
        navigate(path)
    }

    const sections = [
        {'name': 'Health Data', 'path': '/HealthData'},
        {'name': 'Recommendations', 'path': '/Recommendations'},
        {'name': 'Statistics', 'path': '/Statistics'},
        {'name': 'Pill Intake', 'path': '/PillIntake'},
    ]

    return (
            <div className='App'>
                <nav>
                    {sections.map(section => (
                        <button onClick={() => navigate(section.path)}>{section.name}</button>
                    ))}
                </nav>
            
                <Outlet />
            </div>
    );
}

function Statistics() {
    return (
        <h2>Statistics</h2>
    )
}

function PillIntake() {
    return (
        <h2>
            Pill Intake
        </h2>
    )
}

function NoMatch() {
    return (
        <div className='center'>
            <img src='internet_404_page_not_found.png' alt='Nothing to see here' />
        </div>
    )
}
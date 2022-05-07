import './App.css';
import Login from './Login';
import HealthData from './HealthData';
import Statistics from './Statistics';
import Recommendations from './Recommendations';
import PillIntake from './PillIntake';
import SignUp from './SignUp/SignUp';
import useToken from './useToken';
import React, { useEffect, useState } from 'react';
import {
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import useUser from './useUser';
import useUserDatabase from './useUserDatabase';
import LogOut from './LogOut';
import Contents from './Contents';
import Home from './Home';


export default function App() {
    const { user, setUser } = useUser();
    const { token, setToken } = useToken({setUser});
    const { userDatabase, setUserDatabase } = useUserDatabase();

    const handleLogout = () => {
        console.log('Logging out')
        setToken();
        setUser();
    }

    useEffect(() => {
        if (!token) {
            setUser();
        }
    }, [token, setUser])

    if (!token) {
        return (
            <Routes>
                <Route path='/' element={<Home />} />
                <Route
                    path='/Login'
                    element={
                        <Login
                            setToken={setToken}
                            setUser={setUser}
                            userDatabase={userDatabase}
                        />
                    }
                />
                <Route
                    path='/SignUp'
                    element={
                        <SignUp
                            userDatabase={userDatabase}
                            setUserDatabase={setUserDatabase}
                        />
                    }
                />
                <Route path='/*' element={<Navigate to='/' replace />} />
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path='/' element={<Contents user={user} />}>
                    <Route path='HealthData' element={<HealthData />} />
                    <Route path='Recommendations' element={<Recommendations />} />
                    <Route path='Statistics' element={<Statistics />} />
                    <Route path='PillIntake' element={<PillIntake />} />

                    <Route index element={<Navigate to='/HealthData' replace />} />
                    <Route path='*' element={<NoMatch />} />
                </Route>
                <Route
                    path='/LogOut'
                    element={<LogOut onLogout={handleLogout} />}
                />
            </Routes>
        )
    }
}

function NoMatch() {
    return (
        <div className='center'>
            <img src='/internet_404_page_not_found.png' alt='Nothing to see here' />
        </div>
    )
}
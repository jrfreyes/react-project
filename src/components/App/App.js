import './App.css';
import Login from './Login';
import HealthData from './HealthData';
import Statistics from './Statistics';
import Recommendations from './Recommendations';
import PillIntake from './PillIntake';
import SignUp from './SignUp/SignUp';
import useToken from './useToken';
import React, { useEffect } from 'react';
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

async function verifyToken(token) {
    fetch('/.netlify/functions/login', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({ token: token })
    })
        .then(data => data.json)
        .catch((error) => {
            console.log('log client error: ' + error);
            throw new Error("Token was invalid");
        })
}

export default function App() {
    const { token, setToken } = useToken();
    const { user, setUser } = useUser();
    const { userDatabase, setUserDatabase } = useUserDatabase();

    useEffect(() => {
        verifyToken(token)
            .then(setUser)
            .catch((error) => {
                console.log(error);
            })
        return () => {
            setUser();
        };
    }, [token, user, setUser])

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
    }

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
                element={<LogOut setToken={setToken} setUser={setUser} />}
            />
        </Routes>
    )
}

function NoMatch() {
    return (
        <div className='center'>
            <img src='/internet_404_page_not_found.png' alt='Nothing to see here' />
        </div>
    )
}
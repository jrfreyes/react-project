import './App.css';
import Login from './Login';
import HealthData from './HealthData';
import Statistics from './Statistics';
import Recommendations from './Recommendations';
import PillIntake from './PillIntake';
import SignUp from './SignUp/SignUp';
import useToken from './useToken';
import React from 'react';
import PropTypes from 'prop-types';
import { 
    Routes,
    Route,
    Outlet,
    Navigate,
    useNavigate,
    Link,
} from 'react-router-dom';
import useUser from './useUser';

export default function App() {
    const {token, setToken} = useToken();
    const {user, setUser} = useUser();

    if(!token) {
        return (
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Login' element={<Login setToken={setToken} setUser={setUser} />} />
                <Route path='/SignUp' element={<SignUp setToken={setToken} setUser={setUser} />} />
                <Route path='/*' element={<Navigate to='/' replace />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path='/' element={<Contents user={user}/>}>
                <Route path='HealthData' element={<HealthData />}/>
                <Route path='Recommendations' element={<Recommendations />}/>
                <Route path='Statistics' element={<Statistics />} />
                <Route path='PillIntake' element={<PillIntake />} />
                <Route index element={<Navigate to='/HealthData' replace />} />
                <Route path='*' element={<NoMatch />} />
            </Route>
            <Route path='/LogOut' element={<LogOut setToken={setToken} setUser={setUser} />} />
        </Routes>
    )
}

function Home() {
    let navigate = useNavigate();
    console.log('Hello')
    return (
    <div className="hero-text">
        <img src="images/logo.png" style={{width:'30%'}} alt='' />
        <p>Health Monitoring Application</p>
        <hr className="solid"/ >
        <p>Already a user? <Link to='/Login'>LOGIN</Link></p>
        <button onClick={() => navigate('/SignUp')}>SIGN UP</button>
    </div>
    )
}

function Contents( {user} ) {
    
    let navigate = useNavigate();

    const sections = [
        {'name': 'Health Data', 'path': '/HealthData'},
        {'name': 'Recommendations', 'path': '/Recommendations'},
        {'name': 'Statistics', 'path': '/Statistics'},
        {'name': 'Pill Intake', 'path': '/PillIntake'},
    ]

    return (
            <div className='App'>
                <div className='User'>
                    <img src='/images/logo.png' alt=''/>
                    <br/>
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
                            <button onClick={() => navigate(section.path)}>{section.name}</button>
                        ))}
                    </nav>
                
                    <Outlet />
                </div>
            </div>
    );
}

Contents.propTypes = {
    user: PropTypes.any
}

function LogOut ( {setToken, setUser} ) {
    setToken('');
    setUser('');
    return (
        <Navigate to='/' />
    )
}

LogOut.propTypes = {
    setToken: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired
}


function NoMatch() {
    return (
        <div className='center'>
            <img src='/internet_404_page_not_found.png' alt='Nothing to see here' />
        </div>
    )
}
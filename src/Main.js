import './Main.css';
import HealthData from './HealthData';
import Recommendations from './Recommendations';
import React from 'react';
import { 
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
} from 'react-router-dom';

export default function Main() {
    return (
        <Router>
            <Contents />
        </Router>
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
            <div className='Main'>
                <h1>Hello World</h1>
                <nav>
                    {sections.map(section => (
                        <button onClick={() => navigate(section.path)}>{section.name}</button>
                    ))}
                </nav>
            
                <Routes>
                    <Route path='/HealthData' element={<HealthData />}/>
                    <Route path='/Recommendations' element={<Recommendations />}/>
                    <Route path='/Statistics' element={<Statistics />} />
                    <Route path='/PillIntake' element={<PillIntake />} />
                    <Route path='*' element={<Navigate to='/HealthData' replace />} />
                </Routes>
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
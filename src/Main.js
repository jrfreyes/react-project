import './Main.css';
import HealthData from './HealthData';
import Recommendations from './Recommendations';
import React, { useState } from 'react';

function Main() {
    const [currentSection, setCurrentSection] = useState(<HealthData/>);
    function handleClick(section) {
        setCurrentSection(section);
    } 

    const sections = [
        {'name': 'Health Data', 'component': <HealthData/>},
        {'name': 'Recommendations', 'component': <Recommendations/>},
        {'name': 'Statistics', 'component': 'Statistics'},
        {'name': 'Pill Intake', 'component': 'PillIntake'},
    ]

    return (
        <div className="Main">
            <div className="SideBar">
                {sections.map((section) => (
                    <button onClick={() => handleClick(section.component)}>{section.name}</button>
                ))}
                
                
            </div>

            {currentSection}

        </div>
    );
}

export default Main;
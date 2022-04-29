import './HealthData.css'
import React, { useState } from 'react';

function HealthData() {
    const [currentPage, setCurrentPage] = useState("BMI");
    function switchPage(page) {
        setCurrentPage(page)
        console.log(currentPage)
    }

    const pages = [
        'Body Mass Index',
        'Lean Body Mass',
        'Heart Rate',
        'Blood Pressure',
        'Sleep Pattern',
    ]
    return (
        <div className="HealthData">
            <div className="HealthDataOptions">
                {pages.map((page) => (
                    <button onClick={() => switchPage(page)}>{page}</button>
                ))}
                
            </div>
            <div className="HealthDataContent">
                <center>
                    <p><img src='placeholder.png' alt='Place Graph Here'/></p>
                    <p>{currentPage}</p>
                </center>
            </div>
        </div>
        
    );
}

export default HealthData;
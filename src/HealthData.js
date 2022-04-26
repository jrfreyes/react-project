import './HealthData.css'
import React, { useState } from 'react';

function HealthData() {
    const [currentPage, setCurrentPage] = useState("BMI");
    return (
        <div className="HealthData">
            <div className="HealthDataOptions">
                <button>Body Mass Index</button>
                <button>Lean Body Mass</button>
                <button>Heart Rate</button>
                <button>Blood Pressure</button>
                <button>Sleep Pattern</button>
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
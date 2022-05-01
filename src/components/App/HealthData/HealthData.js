import './HealthData.css'
import BMI from './BMI'
import React, { useState } from 'react';
import Input from './Input';


export default function HealthData() {
    const [currentPage, setCurrentPage] = useState("");
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
                <hr/>
                <button onClick={() => switchPage('BMI')}>Calculate BMI</button>
                <button onClick={() => switchPage('Input')}>Input Data</button>
            </div>
            <div className="HealthDataContent">
            { currentPage === 'BMI' ?
            <BMI /> 
            : currentPage === 'Input' ?
            <Input />
            : (
            
                <center>
                    <p><img src='placeholder.png' alt='Place Graph Here'/></p>
                    <p>{currentPage}</p>
                </center>
            
            )
            }
            </div>
        </div>
        
    );
}

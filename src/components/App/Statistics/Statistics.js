import './Statistics.css'
import React, { useState } from 'react';


export default function Statistics() {
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
        <div className="Statistics">
            

            <div className="StatisticsOptions">
                {pages.map((page) => (
                    <button onClick={() => switchPage(page)}>{page}</button>
                ))}
            </div>
            <div className="StatisticsContent">
                     
                <center>
                    <p><img src='placeholder.png' alt='Place Graph Here'/></p>
                    <p>{currentPage}</p>
                </center>
            
            </div>
        </div>
        
    );
}

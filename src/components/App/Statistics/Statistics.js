import './Statistics.css'
import React, { useState } from 'react';
import { generateSampleData, formatTime, calculateBmi, calculateLeanBodyMass } from '../HealthData/generateData'
import { 
    Cell,
    ResponsiveContainer, 
    Bar, 
    BarChart, 
    XAxis, 
    YAxis,
    Tooltip,
} from 'recharts'

const data = [
    generateSampleData(1, 'You'),
    {
        name: "Filipino",
        height: 156.41,
        weight: 49.57,
        bmi: calculateBmi(49.57, 156.41),
        lbm: calculateLeanBodyMass(49.57, 156.43),
        heartRate: 80,
        systole: 110,
        diastole: 70,
        sleepTime: 7,
    },
    {
        name: "Filipino Male",
        height: 163.22,
        weight: 53,
        bmi: calculateBmi(53, 163.22),
        lbm: calculateLeanBodyMass(53, 163.22),
        heartRate: 90,
        systole: 115,
        diastole: 75,
        sleepTime: 6.5
    },
    {
        name: "Filipino Female",
        height: 149.60,
        weight: 56,
        bmi: calculateBmi(56, 149.60),
        lbm: calculateLeanBodyMass(56, 149.60),
        heartRate: 80,
        systole: 105,
        diastole: 65,
        sleepTime: 7.5
    },
]


export default function Statistics() {

    const pages = {
        'bmi': {key: 'bmi', title: 'Average Body Mass Index', data0: 'bmi', label0: 'BMI'},
        'lbm': {key: 'lbm', title: 'Average Lean Body Mass', data0: 'lbm', label0: 'Lean Body Mass'},
        'heartRate': {key: 'heartRate', title: 'Average Heart Rate', data0: 'heartRate', label0: 'Heart Rate', unit: 'bpm'},
        'bp': {key: 'bp', title: 'Average Blood Pressure', data0: 'systole', data1: 'diastole', 
                label0: 'Systolic BP', label1: 'Diastolic BP', unit: 'mmHg'},
        'sleep': {key: 'sleep', title: 'Average Sleep Time', data0: 'sleepTime',
                label0: 'Sleep Time', unit: 'hrs.'},
    }
    
    const [currentPage, setCurrentPage] = useState(pages["bmi"]);
    function switchPage(page) {
        setCurrentPage(pages[page])
    }

    const renderLineChart = (
        <BarChart width={600} height={400} data={data} maxBarSize={150}>
            <Tooltip formatter={currentPage.formatter} />
            <Bar dataKey={currentPage.data0} unit={currentPage.unit} name={currentPage.label0} label={{position: 'top'}}>
                {data.map((entry) => (
                    <Cell fill={entry.name === 'You' ? "#8884d8": "#8884d899"} />
                ))}
            </Bar>
            {currentPage.data1 && (
                <Bar dataKey={currentPage.data1} unit={currentPage.unit} name={currentPage.label1} label={{position: 'top'}}>
                    {data.map((entry) => (
                        <Cell fill={entry.name === 'You' ? "#ff84d8": "#ff84d899"} />
                    ))}
                </Bar>
            )}
            <XAxis dataKey='name' />
            <YAxis />
        </BarChart>
    )
    

    return (
        <div className="Statistics">
            

            <div className="StatisticsOptions">
                {Object.keys(pages).map((page) => (
                    pages[page].title && (
                    <button key={page} onClick={() => switchPage(page)}>
                        {pages[page].title}
                    </button>
                    )
                ))}
            </div>
            <div className="StatisticsContent">
                     
                <center>
                    {renderLineChart}
                    <h2>{currentPage.title}</h2>
                </center>
            
            </div>
        </div>
        
    );
}

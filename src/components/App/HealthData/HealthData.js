import './HealthData.css'
import BMI from './BMI'
import React, { useState } from 'react';
import Input from './Input';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import generateData, { formatTime, generateSampleData } from './generateData';


// TODO Implement charts using sample data

export default function HealthData() {

    const pages = {
        'bmi': {key: 'bmi', title: 'Body Mass Index', data0: 'bmi', label0: 'BMI'},
        'lbm': {key: 'lbm', title: 'Lean Body Mass', data0: 'lbm', label0: 'Lean Body Mass'},
        'heartRate': {key: 'heartRate', title: 'Heart Rate', data0: 'heartRate', label0: 'Heart Rate', unit: 'bpm'},
        'bp': {key: 'bp', title: 'Blood Pressure', data0: 'systole', data1: 'diastole', 
                label0: 'Systolic BP', label1: 'Diastolic BP', unit: 'mmHg'},
        'sleep': {key: 'sleep', title: 'Sleep Pattern', data0: 'sleepTimeHour', data1: 'wakeTimeHour',
                label0: 'Sleep Time', label1: 'Wake Time', formatter: formatTime},
        'BMIcalc': {key: 'BMIcalc'},
        'Input': {key: 'Input'},
    }

    const [currentPage, setCurrentPage] = useState(pages['bmi']);
    const switchPage = (page) => {
        setCurrentPage(pages[page])
        console.log(currentPage)
    }

    const data = generateSampleData()

    const renderLineChart = (
    <LineChart width={600} height={400} data={data}>
        <Line type="monotone" dataKey={currentPage.data0} stroke="#8884d8" 
            unit={currentPage.unit} name={currentPage.label0} />
        {currentPage.data1 && 
        <Line type="monotone" dataKey={currentPage.data1} stroke="#d88488" 
            unit={currentPage.unit} name={currentPage.label1} />}
        <XAxis dataKey="name" />
        { currentPage.key === 'sleep' ?
        <YAxis reversed/> : <YAxis />
        }
        <Tooltip formatter={currentPage.formatter}/>
    </LineChart>
    );


    return (
        <div className="HealthData">
            <div className="HealthDataOptions">
                {Object.keys(pages).map((page) => (
                    pages[page].title && <button key={page} onClick={() => switchPage(page)}>{pages[page].title}</button>
                ))}
                <hr/>
                <button onClick={() => switchPage('BMIcalc')}>Calculate BMI</button>
                <button onClick={() => switchPage('Input')}>Input Data</button>
            </div>
            <div className="HealthDataContent">
            { currentPage.key === 'BMIcalc' ?
            <BMI /> 
            : currentPage.key === 'Input' ?
            <Input switchPage={switchPage}/>
            : (
                <center>
                    {renderLineChart}
                    <caption>{currentPage.title}</caption>
                </center>
            )
            }
            </div>
        </div>
        
    );
}

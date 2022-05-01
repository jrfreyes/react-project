import './BMI.css'
import React, { useState } from 'react'


export default function BMI() {

    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [bmi, setBMI] = useState(0);
    const [status, setStatus] = useState('Normal')
    
    const calculate = () => {
        setBMI(weight / (height/100) ** 2)
        if (bmi) {
            if (bmi < 18.5) {
                setStatus('Underweight')
            }
            else if (bmi < 25) {
                setStatus('Healthy')
            }
            else if (bmi < 30) {
                setStatus('Overweight')
            }
            else {
                setStatus('Obese')
            }
            
        }
        
    }

    return (
        <div className="BMI">  
            <label>
                <input type="number" onChange={e => setHeight(e.target.valueAsNumber)} 
                    placeholder="Enter Your Height in Centimeters: "/ >
            </label>        
            <label>
                <input type="number" onChange={e => setWeight(e.target.valueAsNumber)} 
                    placeholder="Enter Your Weight in Kilograms: "/ >
            </label>            
            <button onClick={calculate}>Calculate BMI</button>
                
            <div className="bmi-value">
                <h4>BMI Value: {bmi ? Math.round(bmi * 100) / 100 : ''}</h4>
            </div>
            <div className="status">
                <h4>Status: </h4>
                <div id="bmi-status">{status}</div>
            </div>   
        </div>
    )
}
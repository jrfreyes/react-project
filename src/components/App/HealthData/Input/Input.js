import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

export default function Input() {
    const navigate = useNavigate();
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [bmi, setBMI] = useState(0);
    const [stat, setStat] = useState('')

    useEffect(() => {
        setBMI(Math.round(weight/((height/100)**2) * 100)/100);
        console.log(bmi);
    }, [weight, height])

    useEffect(() => {
        setStat(calcStat());
        console.log(stat);
    }, [bmi])
    async function handleSubmit(e) {
        e.preventDefault();
        navigate('/HealthData');
    }


    const calcStat = () => {
    
        if (bmi > 0) {
            if (bmi < 18.5) {
                return 'Underweight'
            }
            else if (bmi < 25) {
                return 'Healthy'
            }
            else if (bmi < 30) {
                return 'Overweight'
            }
            else {
                return 'Obese'
            }
            
        }
        return ''
    }
    
    

    return (
        <div className="Input">
            <form onSubmit={handleSubmit}>

            <div>
                <label><b>Weight</b></label><br/>
                <input type="number" onChange={(e) => setWeight(e.target.valueAsNumber)} 
                    placeholder="Enter Weight in kgs" required/>
                <br/>
                <label><b>Height</b></label><br/>
                <input type="number" onChange={(e) => setHeight(e.target.valueAsNumber)} 
                    placeholder="Enter Height in cm" required/>
                <br/>
                {bmi && stat ? (
                <p>BMI: {bmi} Status: {stat}</p> 
                ) : false}
                <br/>
                <label><b>Heart Rate</b></label><br/>
                <input type="number" placeholder="Enter Heart Rate" required/>
                <br/>
                <label><b>Blood Pressure</b></label><br/>
                <input type="number" placeholder="Enter systolic BP in mmHg" required/>
                <input type="number" placeholder="Enter diastolic BP in mmHg" required/>
                <br/>
                <label><b>Sleep and Wake Times</b></label><br/>
                <input type="time" placeholder="Enter Sleep Time" required/>
                <input type="time" placeholder="Enter Wake Time" required/>
                <br/>
                <div className="center">
                <button type="submit">Submit</button>
                </div>
            </div>

            </form>
        </div>
    )
}


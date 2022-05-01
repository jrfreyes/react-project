import React from "react";
import { useNavigate } from "react-router-dom";

export default function Input() {
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        navigate('/HealthData');
    }
    return (
        <div className="Input">
            <form onSubmit={handleSubmit}>

            <div>
                <label><b>Weight</b></label><br/>
                <input type="number" placeholder="Enter Weight in kgs" required/>
                <br/>
                <label><b>Height</b></label><br/>
                <input type="number" placeholder="Enter Height in cm" required/>
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

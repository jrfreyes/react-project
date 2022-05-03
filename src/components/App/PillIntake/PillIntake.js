import Reminder from "./Reminder";
import './PillIntake.css'
import { useEffect, useState } from "react";
import Clock from "react-clock";
import PropTypes from 'prop-types';
import 'react-clock/dist/Clock.css';

export default function PillIntake() {
    const [time, setTime] = useState(new Date())
    const [overlayActive, setOverlayActive] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000)

        return () => {
            clearInterval(interval);
        }
    })

    return (
        <div className="PillIntake">
            <div className="PillSideBar">
                <div className="PillClock center">
                    <Clock value={time} />
                </div>
                
                <p className="center">{time.toLocaleString('default', { 'day':'numeric', 'month':'long' })}</p>
                <button className="center" onClick={() => setOverlayActive(true)}>Add New</button>
            </div>
            <div className="Reminders">
                <Reminder />
                <Reminder />
                <Reminder />
            </div>
            {
                overlayActive ? (
                    <Overlay setOverlayActive={setOverlayActive} />
                ) : null
            }
        </div>
    )
}

function Overlay({setOverlayActive}) {
    const close = () => {
        setOverlayActive(false)
    }

    return (
        <div id="overlay" onClick={close}>
            <form className="AddNew center" onClick={e => e.stopPropagation()}>
                <div className="AddNewHeader">Add New Medicine
                <button className="close-button" aria-label="Close" onClick={close}>
                    <span aria-hidden='true'>&times;</span>
                </button>
                </div>
                <div className="AddNewForm">
                    <label>
                        Medicine Name
                        <input type='text' required />
                    </label>
                    <label>
                        Dosage in mg
                        <input type='number' required />
                    </label>
                    <label className="form-inline">
                        Interval Selection<br/>
                        Remind me every <input type='number' min='1' max='99' required /> hours<br/>
                    </label>
                    <label>
                        Starting Time
                        <input type='time' required />
                    </label>
                    <button type='submit'>Add</button>
                </div>
            </form>
        </div>
    )
}

Overlay.propTypes = {
    setOverlayActive: PropTypes.bool
}
import Reminder from "./Reminder";
import './PillIntake.css'
import useReminders from "./useReminders";
import React, { useState } from "react";
import Overlay from "./Overlay";
import 'react-clock/dist/Clock.css';
import PillClock from "./PillClock";

export default function PillIntake() {
    const [overlayActive, setOverlayActive] = useState(false)
    const [activeReminder, setActiveReminder] = useState()
    const {reminders, setReminders} = useReminders()

    const handleAdd = () => {
        setActiveReminder()
        setOverlayActive(true)
    }

    const handleEdit = (id) => {
        setActiveReminder(reminders[id])
        setOverlayActive(true)
    }

    return (
        <div className="PillIntake">
            <div className="PillSideBar">
                <PillClock />
                <button className="center" onClick={handleAdd}>Add New</button>
            </div>
            <div className="Reminders">
                {reminders ? Object.keys(reminders)
                    .sort((a,b) => {
                    if (reminders[a].time > reminders[b].time) return 1
                    if (reminders[a].time < reminders[b].time) return -1
                    return 0
                    })
                .map((id) => (
                    <Reminder key={id} reminderId={id} reminderData={reminders[id]} handleEdit={handleEdit} />
                )) 
                : null}
            </div>
            {
                overlayActive ? (
                    <Overlay setOverlayActive={setOverlayActive} reminders={reminders} setReminders={setReminders} 
                        activeReminder={activeReminder} />
                ) : null
            }
        </div>
    )
}



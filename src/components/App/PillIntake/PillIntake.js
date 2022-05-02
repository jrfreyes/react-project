import Reminder from "./Reminder";
import './PillIntake.css'

export default function PillIntake() {
    return (
        <div className="PillIntake">
            <div className="PillSideBar">
                <button>Add New</button>
            </div>
            <div className="Reminders">
                <Reminder />
                <Reminder />
                <Reminder />
            </div>
        </div>
    )
}


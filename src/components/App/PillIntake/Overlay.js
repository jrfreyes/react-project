import PropTypes from 'prop-types';
import { v4 as uuidv4} from 'uuid'

export default function Overlay({setOverlayActive, reminders, setReminders, activeReminder}) {
    const defaultValues = activeReminder || {
        'time': '',
        'name': '',
        'instructions': '',
        'interval': null
    }

    const id = activeReminder?.id || uuidv4()
    
    const close = (e) => {
        e.preventDefault()
        setOverlayActive(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
        let formData = new FormData(e.target)
        let newData = {"id": id}
        for (let [key, value] of formData.entries()) {
            newData[key] = value
        }
        let newReminders = JSON.parse(JSON.stringify(reminders))
        newReminders[id] = newData
        setReminders(newReminders)
        setOverlayActive(false)
    }

    return (
        <div id="overlay" onClick={close}>
            <form className="AddNew center" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
                <div className="AddNewHeader">{activeReminder ? "Edit Reminder" : "Add New Medicine"}
                <button className="close-button" aria-label="Close" onClick={close}>
                    <span aria-hidden='true'>&times;</span>
                </button>
                </div>
                <div className="AddNewForm">
                    <label>
                        Medicine Name
                        <input type='text' id='name' name='name' defaultValue={defaultValues.name} required />
                    </label>
                    <label>
                        Instructions
                        <input type='text' id='instructions' name='instructions' 
                            defaultValue={defaultValues.instructions} required />
                    </label>
                    <label className="form-inline">
                        Interval Selection<br/>
                        Remind me every <input type='number' min='1' max='99' id='interval' name='interval'
                            defaultValue={defaultValues.interval} required /> hours<br/>
                    </label>
                    <label>
                        Starting Time
                        <input type='time' id='time' name='time' defaultValue={defaultValues.time} required />
                    </label>
                    <button type='submit'>{activeReminder ? 'Save' : 'Add'}</button>
                </div>
            </form>
        </div>
    )
}

Overlay.propTypes = {
    setOverlayActive: PropTypes.func,
    reminders: PropTypes.object,
    setReminders: PropTypes.func,
    activeReminder: PropTypes.object
}
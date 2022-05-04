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
        console.log(e,'Closed')
        e.preventDefault()
        setOverlayActive(false)
    }

    const handleSubmit = (e) => {
        console.log('Submitted')
        e.preventDefault()
        let formData = new FormData(e.target)
        let newData = {"id": id}
        newData = {...newData, ...Object.fromEntries(formData.entries())}

        let newReminders = JSON.parse(JSON.stringify(reminders))
        newReminders[id] = newData
        
        setReminders(newReminders)
        setOverlayActive(false)
    }

    return (
        <div id="overlay" onClick={close}>
            <form className="AddNew center" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
                <div className="AddNewHeader">{activeReminder ? "Edit Reminder" : "Add New Medicine"}
                <button className="close-button" type='reset' aria-label="Close" onClick={close}>
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
import PropTypes from 'prop-types'
import './Reminder.css'

export default function Reminder({reminderId, reminderData, handleEdit}) {
    return (
        <div className="Reminder" onClick={() => handleEdit(reminderId)}>
            <div className='ReminderHeader'>
                {convertTo12hour(reminderData.time)}
            </div>
            <div className='ReminderSpacer' />
            <div className='ReminderContents'>
                <p className='DrugName'>{reminderData.name}</p>
                <p className='Instructions'>{reminderData.instructions}</p>
            </div>
        </div>
    )
}

Reminder.propTypes = {
    reminderId: PropTypes.any,
    reminderData: PropTypes.any,
    handleEdit: PropTypes.func
}

function convertTo12hour(time) {
    let [hour, minute] = time.split(':')
    hour = parseInt(hour)
    let meridian = hour < 12 ? "AM" : "PM"
    hour = hour % 12 || 12
    return `${hour}:${minute}${meridian}`
}
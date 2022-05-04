import PropTypes from 'prop-types'
import './Reminder.css'

export default function Reminder({reminderId, reminderData}) {
    return (
        <div className="Reminder">
            <div className='ReminderHeader'>
                {reminderData.time}
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
}
import PropTypes from 'prop-types'
import './Reminder.css'

export default function Reminder({time, drugName, instructions}) {
    return (
        <div className="Reminder">
            <div className='ReminderHeader'>
                8:00AM
            </div>
            <div className='ReminderSpacer' />
            <div className='ReminderContents'>
                <p className='DrugName'>Simvastatin</p>
                <p className='Instructions'>5mg. Take 1 with food</p>
            </div>
        </div>
    )
}

Reminder.propTypes = {
    time: PropTypes.any,
    drugName: PropTypes.string,
    instructions: PropTypes.string,
}
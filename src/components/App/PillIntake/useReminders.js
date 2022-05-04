import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import json from './sampleReminders.json'

export default function useReminders() {
    const getReminders = () => {
        const remindersString = localStorage.getItem('reminders');
        let remindersData = JSON.parse(remindersString);
        if (!remindersData) {
            remindersData = populateReminders()
            saveReminders(remindersData)
        }
        return remindersData;
    }
    
    const populateReminders = () => {
        const sampleReminders = json.items
        const remindersData = Object.fromEntries(sampleReminders.map((sampleReminder) => [uuidv4(), sampleReminder]))
        
        return remindersData
    }


    const [reminders, setReminders] = useState(getReminders());
    
    const saveReminders = remindersData => {
        if (remindersData) {
            console.log(remindersData)
            localStorage.setItem('reminders', JSON.stringify(remindersData));
            setReminders(remindersData);
        }
        // if reminders is empty delete reminders from localStorage
        else {
            localStorage.removeItem('reminders');
            setReminders({});
        }
    }

    
    return {
        setReminders: saveReminders,
        reminders
    }
}
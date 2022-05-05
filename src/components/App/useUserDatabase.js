import { useState } from "react";
import sampleUsers from './sampleUsers.json'

export default function useUserDatabase() {
    const getUserDatabase = () => {
        const userDatabaseString = localStorage.getItem('users');
        let userDatabaseData = JSON.parse(userDatabaseString);
        if (!userDatabaseData) {
            userDatabaseData = populateUsers()
        }
        return userDatabaseData;
    }
    
    const populateUsers = () => {
        localStorage.setItem('users', JSON.stringify(sampleUsers));
        return sampleUsers
    }

    const [userDatabase, setUserDatabase] = useState(getUserDatabase());
    
    const saveUserDatabase = userDatabaseData => {
        if (userDatabaseData) {
            localStorage.setItem('users', JSON.stringify(userDatabaseData));
            setUserDatabase(userDatabaseData);
        }
        // if users is empty delete users from localStorage
        else {
            localStorage.removeItem('users');
            setUserDatabase({});
        }
    }

    
    return {
        setUserDatabase: saveUserDatabase,
        userDatabase
    }
}

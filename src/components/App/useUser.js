import { useState } from "react";

export default function useUser() {
    const getUser = () => {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        return user?.username;
    }

    const [user, setUser] = useState(getUser());
    
    const saveUser = user => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user.username);
        }
        else {
            localStorage.removeItem('user');
            setUser();
        }
    }
    
    return {
        setUser: saveUser,
        user
    }
}
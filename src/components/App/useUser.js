import { useState } from "react";

export default function useUser() {
    const getUser = () => {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        return user?.user;
    }

    const [user, setUser] = useState(getUser());
    
    const saveUser = user => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user.user);
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
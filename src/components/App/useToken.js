import { useState } from "react";

async function verifyToken(token) {
    return fetch('/.netlify/functions/verifyToken', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({ token: token })
    })
        .then(response => {
            if (response.ok)
                return response.json()
            else
                throw (new Error(response.json().error))
        })
        .catch((error) => {
            console.log('log client error: ' + error.message);
            throw new Error("Token was invalid");
        })
}

export default function useToken({setUser}) {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        try {
            const userToken = JSON.parse(tokenString);
            verifyToken(userToken?.token)
                .then(setUser)
                .catch((error) => {
                    console.log(error.message);
                    localStorage.removeItem('token');
                    setUser();
                    return;
                })
            return userToken?.token;
        } catch (error) {
            if (error.name === "SyntaxError") {
                console.log('Invalid format of token in localStorage')
                localStorage.removeItem('token')
                return
            } else {
                throw (error);
            }
        }
    }

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        if (userToken) {
            localStorage.setItem('token', JSON.stringify(userToken));
            setToken(userToken.token);
        }
        else {
            localStorage.removeItem('token');
            setUser();
            setToken();
        }
    }

    return {
        setToken: saveToken,
        token
    }
}
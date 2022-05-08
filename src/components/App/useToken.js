import { useEffect, useState } from "react";

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
            throw new Error("Token was invalid");
        })
}

export default function useToken({ verifying, setUser, setVerifying }) {
    let userToken;

    function getToken() {
        const tokenString = localStorage.getItem('token');

        try {
            userToken = JSON.parse(tokenString);
        } catch (error) {
            if (error.name === "SyntaxError") {
                localStorage.removeItem('token')
                setUser();
            } else {
                throw (error);
            }
        }

        return userToken?.token;
    }

    const [token, setToken] = useState(getToken());


    useEffect(() => {
        async function verify() {
            await verifyToken(token)
                .then(setUser)
                .catch(() => {
                    localStorage.removeItem('token');
                    setUser();
                    setToken();;
                })
            setVerifying(false);
        }
        if (token) {
            verify();
        }
    }, [token, setUser, setVerifying])

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
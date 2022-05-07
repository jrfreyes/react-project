import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import './Login.css'
import bcrypt from 'bcryptjs'

async function loginUser(credentials) {
    return fetch('/.netlify/functions/login', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json)
        .catch((error) => {
            console.log('log client error: ' + error);
            throw new Error("Login failed");
        })
}

export default function Login( {setToken, setUser, userDatabase} ) {
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setInvalidPassword(false)
        setInvalidUsername(false)
        const formData = new FormData(e.target)
        const {username, password} = Object.fromEntries(formData.entries())
        if (username in userDatabase){
            if (bcrypt.compareSync(password, userDatabase[username].passwordHash)) {
                loginUser({username, password})
                    .then((data) => {
                        setToken(data);
                        setUser({user: username});
                        navigate('/');
                    })
                    .catch ((error) => {
                        console.log(error);
                        setToken();
                        setUser();
                    })
            }
            else setInvalidPassword(true)
        }
        else {
            setInvalidUsername(true)
        }
    }
    return (
        <div className="Login">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>

            <div className="container">
                <label htmlFor="username"><b>Username</b></label><br/>
                <input type="text" placeholder="Enter Username" 
                    name="username" id="username" required/>
                <br/>
                <label htmlFor="password"><b>Password</b></label><br/>
                <input type="password" placeholder="Enter Password" 
                    name="password" id="password" required/>

                {invalidUsername && <p className="Invalid">The username you entered is invalid.</p>}
                {invalidPassword && <p className="Invalid">The password you entered is invalid.</p>}
                
                <button type="submit">LOG IN</button>
                <label>
                    <span className="acc">Need an account? <Link to='/SignUp'>SIGN UP</Link></span>
                </label>
            </div>

            <div className="container grey">
                
            </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    userDatabase: PropTypes.any.isRequired
}
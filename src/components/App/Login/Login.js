import React, { useState } from "react";
import PropTypes from 'prop-types';
import './Login.css'

export default function Login( {setToken} ) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState()

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(username+password);
        // for now maybe just use LocalStorage as database analogue
        setToken({token: 'Hello'}); // Token should be taken from a server ideally
    }
    return (
        <div className="Login">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>

            <div className="container">
                <label><b>Username</b></label><br/>
                <input type="text" placeholder="Enter Username"
                    onChange={e => setUsername(e.target.value)} required/>
                <br/>
                <label><b>Password</b></label><br/>
                <input type="password" placeholder="Enter Password"
                    onChange={e => setPassword(e.target.value)} required/>
                    
                <button type="submit">LOG IN</button>
                <label>
                    <span className="acc">Need an account? <a href="#">SIGN UP</a></span>
                </label>
            </div>

            <div className="container grey">
                
            </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
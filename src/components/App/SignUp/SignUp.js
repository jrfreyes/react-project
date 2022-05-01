import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'

export default function SignUp( {setToken, setUser} ) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState()
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(username+password);
        // for now maybe just use LocalStorage as database analogue
        setToken({token: 'Hello'}); // Token should be taken from a server ideally
        setUser({user: username});
        navigate('/');
    }
    return (
        <div className="SignUp">
            <h2>SignUp</h2>

            <form onSubmit={handleSubmit}>

            <div className="container">
                <label><b>Username</b></label><br/>
                <input type="text" placeholder="Enter Username"
                    onChange={e => setUsername(e.target.value)} required/>
                <br/>
                <label><b>Password</b></label><br/>
                <input type="password" placeholder="Enter Password"
                    onChange={e => setPassword(e.target.value)} required/>
                    
                <button type="submit">SIGN UP</button>
                <label>
                    <span className="acc">Already a user? <Link to='/Login'>LOGIN</Link></span>
                </label>
            </div>

            <div className="container grey">
                
            </div>
            </form>
        </div>
    )
}

SignUp.propTypes = {
    setToken: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired
}
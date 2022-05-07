import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'
import bcrypt from "bcryptjs";

export default function SignUp( {userDatabase, setUserDatabase} ) {
    const [usernameTaken, setUsernameTaken] = useState(false)
    const [creationSuccess, setCreationSuccess] = useState(false)
    const navigate = useNavigate();
    const saltRounds = 10;

    async function handleSubmit(e) {
        e.preventDefault();
        setUsernameTaken(false)
        if (creationSuccess) {
            navigate('/')
            return
        }

        const formData = new FormData(e.target)
        const {username, password} = Object.fromEntries(formData.entries())
        // for now maybe just use LocalStorage as database analogue

        if (username in userDatabase) {
            setUsernameTaken(true)
        }
        else{
            const passwordHash = bcrypt.hashSync(password, saltRounds)
            
            const newUserDatabase = JSON.parse(JSON.stringify(userDatabase))
            let credentials = {
                    "username": username,
                    "passwordHash": passwordHash
                }
            newUserDatabase[username] = credentials
            setUserDatabase(newUserDatabase)
            setCreationSuccess(true)
        }
    }

    // Redirect to Home after 3 seconds
    useEffect(() => {
        if (creationSuccess)
        {
            const interval = setInterval(() => navigate('/'), 3000)
            return () => {
                clearInterval(interval)
            }
        }
    }, [creationSuccess, navigate])

    return (
        <div className="SignUp">
            <h2>SignUp</h2>

            <form onSubmit={handleSubmit}>

            <div className="container">
                <label htmlFor="username"><b>Username</b></label><br/>
                <input type="text" placeholder="Enter Username"
                    name="username" id="username" required/>
                <br/>
                <label htmlFor="password"><b>Password</b></label><br/>
                <input type="password" placeholder="Enter Password"
                    name="password" id="password" required/>

                
                {usernameTaken && (
                    <p className="Invalid">
                        The username you entered is already taken.
                    </p>
                )}    
                <button type="submit">SIGN UP</button>
                <label>
                    <span className="acc">Already a user? <Link to='/Login'>LOGIN</Link></span>
                </label>
            </div>
            <div className="container grey">
                
            </div>
            </form>
            {creationSuccess && (
                <div id="overlay" onClick={() => navigate('/')}>
                    <p className="OverlayContent OverlayText">
                        Your account has been created successfully.
                    </p>
                </div>
            )}
        </div>
    )
}

SignUp.propTypes = {
    userDatabase: PropTypes.object.isRequired,
    setUserDatabase: PropTypes.func.isRequired
}
import { useState } from "react";

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState()

    function handleSubmit() {
        
    }
    return (
        <div className="Login">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>

            <div className="container">
                <label for="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} required/>

                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" onChange={e => setUsername(e.target.value)} required/>
                    
                <button type="submit">LOG IN</button>
                <label>
                    <span class="acc">Need an account? <a href="#">SIGN UP</a></span>
                </label>
            </div>

            <div className="container" style="background-color:#f1f1f1">
                
            </div>
            </form>
        </div>
    )
}

export default Login;
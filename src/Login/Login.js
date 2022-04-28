function Login() {
    return (
        <div className="Login">
            <h2>Login</h2>

            <form action="/action_page.php" method="post">

                <div className="container">
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required/>
                        
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
import React from 'react';
import {
    useNavigate,
    Link
} from 'react-router-dom';

export default function Home() {
    let navigate = useNavigate();
    return (
        <div className="hero-text">
            <img src="images/logo.png" style={{ width: '30%' }} alt='' />
            <p>Health Monitoring Application</p>
            <hr className="solid" />
            <p>Already a user? <Link to='/Login'>LOGIN</Link></p>
            <button onClick={() => navigate('/SignUp')}>SIGN UP</button>
        </div>
    );
}

import React from 'react'
import './Login.css'
import Button from '@mui/material/Button';
import { auth, provider } from "./firebase.js";

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(error => alert(error.message));
    };
    return (
        <div className='login'>
            <h2>PrivateRooms</h2>
            <div className="login__logo">
                <img src="https://images.pexels.com/photos/6147138/pexels-photo-6147138.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
            </div>
            <Button onClick={signIn}>Sign In</Button>
        </div>

    );
}

export default Login
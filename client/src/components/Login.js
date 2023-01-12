import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from 'react';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';

function Login() {

    function onChange() {
        const verifyrecapcha = document.getElementById('verifyrecapcha');
        verifyrecapcha.disabled = false;
    }

    const [UsernameOrEmail  , setUsernameOrEmail] = useState('');
    const [password , setPassword] = useState('');
    const [msg , setMsg] = useState('');

    const formSubmit = (e) => {
        e.preventDefault();
        if(!UsernameOrEmail || !password){
            setMsg('Input is required.');
        }else{
            fetch('https://dull-puce-hedgehog.cyclic.app/login' , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    UsernameOrEmail: UsernameOrEmail,
                    password: password
                })
            }).then((res) => {
                if(res.status === 400){
                    setMsg('Invalid username or password');
                }
                if(res.status === 200){
                    window.location = '/profile';
                }
                return res.json();
            }).then((res) => {
                localStorage.setItem('token' , res.token);
            })
        }
    }

  return (
    <div className='container mt-5 mb-5'>
        <h1 className='text-center'>Login</h1>
        {msg.length > 0 && <div className='alert alert-danger' role='alert'>{msg}</div>}
        <form onSubmit={formSubmit}>
            <div className="mb-3">
                <label for="username" className="form-label">Username Or Email</label>
                <input type="text" className="form-control" id="username" onChange={(e) => setUsernameOrEmail(e.target.value)}></input>
            </div>
            <div className="mb-3">
                <label for="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <Link to='forgot'>Forgot password</Link>
            <ReCAPTCHA sitekey="6LddM5giAAAAALKmNulOJf8ix1RIsuE8nknuNsN3" onChange={onChange} className='mt-3 mb-3'/>
            <button type="submit" className="btn btn-primary" disabled={true} id='verifyrecapcha'>Login</button>&nbsp;&nbsp;&nbsp;
            <Link className='btn btn-success' to='/register'>Go to register</Link>
        </form>
    </div>
  )
}

export default Login
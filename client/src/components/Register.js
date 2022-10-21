import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from 'react';
import Swal from 'sweetalert2'

function Register() {

    function onChange() {
        const verifyrecapcha = document.getElementById('verifyrecapcha');
        verifyrecapcha.disabled = false;
    }
    
    const [fullname , setFullname] = useState('');
    const [username  , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [email , setEmail] = useState('');
    const [msg , setMsg] = useState('');
    
    const formSubmit = (e) => {
        e.preventDefault();
        if(!fullname || !username || !password || !email){
            setMsg('Input is required.');
        }else{
            fetch('https://secure-dusk-44324.herokuapp.com/register' , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullname: fullname,
                    username: username,
                    password: password,
                    email: email
                })
            }).then((res) => {
                if(res.status === 201){
                    Swal.fire(
                        'Successfully to register.',
                        'You clicked the button!',
                        'success'
                    ).then(() => {
                        window.location = '/';
                    });
                }
                return res.json();
            }).then((res) => {
                localStorage.setItem('token' , res.token);
            });
        }
    }


  return (
    <div className='container mt-5 mb-5'>
        <h1 className='text-center'>Register</h1>
        {msg.length > 0 && <div className='alert alert-danger' role='alert'>{msg}</div>}
        <form onSubmit={formSubmit}>
            <div className="mb-3">
                <label for="fullname" className="form-label">Fullname</label>
                <input type="text" className="form-control" id="fullname" onChange={(e) => setFullname(e.target.value)}></input>
            </div>
            <div className="mb-3">
                <label for="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" onChange={(e) => setUsername(e.target.value)}></input>
            </div>
            <div className="mb-3">
                <label for="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div className="mb-3">
                <label for="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <ReCAPTCHA sitekey="6LddM5giAAAAALKmNulOJf8ix1RIsuE8nknuNsN3" onChange={onChange}/><br></br>
            <button type="submit" className="btn btn-primary" disabled={true} id='verifyrecapcha'>Register</button>
        </form>
    </div>
  )
}

export default Register
import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from 'react';
import Swal from 'sweetalert2'

function Forgot() {

  function onChange() {
    const verifyrecapcha = document.getElementById('verifyrecapcha');
    verifyrecapcha.disabled = false;
  }

  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [verifyPassword , setVerifyPassword] = useState('');
  const [msg , setMsg] = useState('');

  const formSubmit = (e) => {
    e.preventDefault();
    if(!email || !password || !verifyPassword){
      setMsg('Input is required.');
    }else{
      if(password !== verifyPassword){
        setMsg('Password do not match.');
      }else{
        fetch('https://boiling-sea-33142.herokuapp.com/forgotpassword' , {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        }).then((res) => {
          if(res.status === 400){
            setMsg('Invalid email.');
          }
          if(res.status === 200){
            Swal.fire(
              'Password has been updated.',
              'You clicked the button!',
              'success'
          ).then(() => {
              window.location = '/';
          });
          }
        })
      }
    }
  }

  return (
    <div className='container mt-5 mb-5'>
        <h1 className='text-center'>Reset password</h1>
        {msg.length > 0 && <div className='alert alert-danger' role='alert'>{msg}</div>}
        <form onSubmit={formSubmit}>
            <div className="mb-3">
                <label for="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div className="mb-3">
                <label for="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div className="mb-3">
                <label for="verifypassword" className="form-label">Verify password</label>
                <input type="password" className="form-control" id="verifypassword" onChange={(e) => setVerifyPassword(e.target.value)}></input>
            </div>
            <ReCAPTCHA sitekey="6LddM5giAAAAALKmNulOJf8ix1RIsuE8nknuNsN3" onChange={onChange} className='mt-3 mb-3'/>
            <button type="submit" className="btn btn-primary" disabled={true} id='verifyrecapcha'>Change password</button>
        </form>
    </div>
  )
}

export default Forgot
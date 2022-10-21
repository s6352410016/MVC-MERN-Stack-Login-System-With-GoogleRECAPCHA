import React from 'react';
import {useState} from 'react';


function Profile() {

    const [info , setInfo] = useState('');
    
    const auth = () => {
        fetch('https://boiling-sea-33142.herokuapp.com/auth' , {
            method: 'GET',
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then((res) => {
            if(res.status === 401 || res.status === 403){
                window.location = '/';
            }
            return res.json();
        }).then((res) => {
            setInfo(res.decoded.data);
        })
    }
    auth();

    const logout = () => {
        localStorage.removeItem('token');
        window.location = '/';
    } 

  return (
    <div className='container mt-5 mb-5'>
        <h2>Hello {info}</h2>
        <br></br>
        <button className='btn btn-danger' onClick={logout}>Logout</button>
    </div>
  )
}

export default Profile
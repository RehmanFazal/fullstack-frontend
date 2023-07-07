import axios from 'axios';
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';

export default function AddUser() {

    let navigate = useNavigate();

    const[user, setUser] = useState({
        name:"",
        username:"",
        email:""
    });

    const onChangeInput = (e) => {
        setUser({...user, [e.target.name]:e.target.value});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/api/create-user", user);
        navigate("/");
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center '>Register User</h2>
                <form onSubmit={onSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'>Name</label>
                        <input type={'text'} className='form-control' placeholder='Enter your Name' onChange={(e)=>onChangeInput(e)} value={user.name} name='name' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Username' className='form-label'>Username</label>
                        <input type={'text'} className='form-control' placeholder='Enter Username' onChange={(e)=>onChangeInput(e)} value={user.username} name='username' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Email' className='form-label'>Email</label>
                        <input type={'text'} className='form-control' placeholder='Enter Email' onChange={(e)=>onChangeInput(e)} value={user.email} name='email' />
                    </div>
                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                    <Link to='/' className='btn btn-outline-danger mx-2'>Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}

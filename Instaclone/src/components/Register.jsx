import React, { useState } from 'react'
import '../App.css'
import axios from 'axios'

function Register() {

    const[register,setRegister]=useState({
        email:"",
        password:""
    })



    function handlechange(e){
        setRegister({
            ...register,
            [e.target.name]:e.target.value}
        )
    }



    const submit=async(e)=>{
        e.preventDefault()
        axios.post('http://instagramclone-frg6hsahhjhxh6em.eastasia-01.azurewebsites.net/users',register)
        .then(()=>console.log("user created"))        

    }



  return (



    <div className='register'>Register Details 

        <form onSubmit={submit}>
            <label>Enter Email : </label>
            <input type="text" value={register.email} name='email' onChange={handlechange} /><br />
            <label >Enter password : </label>
            <input type="password" value={register.password} name='password' onChange={handlechange} /><br />
            <button>Create User</button>
        </form>


    </div>
  )
}

export default Register
import React, { useEffect,useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

function Login() {

  const navigate=useNavigate()

  const[Login,setLogin]=useState(
    {
      email:"",
      password:""
    }
  )

 

  function handlechange(e){
    setLogin({
      ...Login,
      [e.target.name]:e.target.value
      
    })
  }
  


  const handleclick=async(e)=>{
    e.preventDefault()
    try
    {const response=await axios.post('http://instagramclone-frg6hsahhjhxh6em.eastasia-01.azurewebsites.net/login',Login)
    console.log("credentials send")
    console.log(response.data)
    const token=response.data.access_token
    localStorage.setItem("token",token)
    navigate('/app')
  
  
  }
    catch(error){
      console.log(error.response?.data)
    }
  }


  

  return (
    <>
     
      <div className="login">
    <form onSubmit={handleclick}>
        <h2>INSTAGRAM</h2>

        <label>USERNAME :</label>
        <input type="text" name='email' value={Login.email} onChange={handlechange}/>

        <label>PASSWORD :</label>
        <input type="password" name='password' value={Login.password}  onChange={handlechange}/> <br/>

        <button >LOGIN</button><br />
        <button onClick={()=>navigate("/register")} >REGISTER</button>
    </form>
</div>
    </>
  )
}

export default Login
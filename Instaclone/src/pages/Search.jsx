import React, { useState } from 'react'
import api from "../services/intercept.jsx"
import { useNavigate } from 'react-router-dom'


function Search() {
    const navigate=useNavigate()
    const[search,setsearch]=useState("")
    const[Users,setUsers]=useState([])
    const[error,seterror]=useState("")

   const onclick=()=>{
    seterror("")
    setUsers([])
    api.get(`/Search?uname=${search}`)
    .then(data=>setUsers(data.data))
    .catch(err=>{seterror(err.response?.data?.detail || "something fishy")})
   }

   function openprofile(id){
    navigate(`/Openprofile/${id}`)

   }
  return (
    <>
    <div className='search'>
        ENTER UNAME:<input type="text" name="username" value={search}
        onChange={(e)=>setsearch(e.target.value)}/>
    <button onClick={onclick}>Search</button>

        
    </div>
    <div className='s1'>
        {Users.length>0?(
            <div>
                
                {Users.map((user)=>(
                    <div onClick={()=>openprofile(user.id)} key={user.id}>

                        <p>{user.username}</p>
                        
                    </div>
                   
                ))}
            </div>
        ):error?(
            <div>
                {error}
            </div>
        ):
        (

            <div>

            </div>
        )}
    </div>
    
    </>
  )
}

export default Search
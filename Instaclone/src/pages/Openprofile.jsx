import  { useState,useEffect } from 'react'
import api from "../services/intercept.jsx"
import { useParams } from 'react-router-dom'

function Openprofile() {

    const {id}=useParams()

    const[users,setusers]=useState(null)
    const[error,seterror]=useState(null)

    useEffect(()=>{
        api.get(`/profile/${id}`)
        .then(data=>setusers(data.data))
        .catch(error=>
           { seterror(error.response?.data?.detail || "something fishy")})
        
    },[])
  return (
    <>
    <div>
        {users ?(
            <div className='openp'>
                <img src={users.profile_pic} alt="" />
                <h1>{users.username}</h1>

                

            </div>
        ):(
            <div>
                {error}

            </div>
        )}


    </div>
    
    </>

)
}

export default Openprofile
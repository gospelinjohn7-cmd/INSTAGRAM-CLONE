import React, { useEffect, useState } from 'react'

import axios from 'axios'
import api from '../services/intercept.jsx'


function Suggest() {

  const[post,setpost]=useState([])
  const[suggestions,setsuggestions]=useState([])
  const[posterror,setposterror]=useState(null)
  const[suggesterror,setsuggesterror]=useState(null)

  useEffect(()=>{
   api.get('/profile')
   .then(data=>setpost(data.data))
   .catch(err=>{setposterror(err.response?.data?.detail || "something is fishy")})
    

  },[])

  useEffect(()=>{
   api.get('/suggestion')
   .then(data=>setsuggestions(data.data)) 
   .catch(err=>{setsuggesterror(err.response?.data?.detail || "something is fishy")})


  },[])

    const handleonclick=async (id,username)=>{
      api.post('/followers',{id:id,username:username})
      .then(alert('fOLLOWED'))
    }
    




  return (
    <>
   <div className='sg1'>
     
     <div className='sug2'>
       <div className='sug3' >
        {post.length > 0 ? (
          <div >
            {post.map((Postz,index)=>(
              <div key={Postz.id}>
              <div className='myid'>
                <img src={Postz.profile_pic}/>
                <p>{Postz.username}</p>
                 <div className='font2'>
                   <p>SWITCH</p>
                 </div>
              </div>
              </div>)
     
              )}
     
          </div>
        ):posterror?(
          <div>
            {posterror}
          </div>
        ):(
          <div>L</div>
        )
        }
       </div>
       <b>Suggestions</b><br />
        <div >
          {suggestions.length > 0 ? (
            <div>
            {suggestions.map((sug)=>
              <div key={sug.id}>
                <div className='sug1'>
                  <img src={sug.profile_pic} alt="" />
                  <p>{sug.username}</p>
                  <div className='folo' onClick={()=>{handleonclick(sug.id,sug.username)}}>
                    <p>Follow</p>
                  </div>
                </div>
              </div>
             )
       }
            </div>
          ):suggesterror?(
            <div>
              {suggesterror}
            </div>
          ):(
            <div>L</div>
          )}
        </div>
     </div>
   </div>
    </>
  )
}

export default Suggest
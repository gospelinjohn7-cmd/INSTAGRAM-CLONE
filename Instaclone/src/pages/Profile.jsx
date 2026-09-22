
import { useState,useEffect } from 'react'
import api from '../services/intercept.jsx'

import axios from 'axios'
function Profile() {

    const [Profile,setProfile] =useState(null)

    const [Followers,setFollowers]=useState([])
    const[unfollow,setunfollow]=useState()
      const[suggestions,setsuggestions]=useState([])

      const[Post,setPost]=useState([])
      const[page,setpage]=useState(1)
      const[followerror,setfollowerror]=useState([])
      const[posterror,setposterror]=useState([])
      const[profileerror,setprofileerror]=useState([])
      const[suggesterror,setsuggesterror]=useState([])



      useEffect(()=>{
        api.get(`/myposts?page=${page}&limit=2`)
        .then(data=> setPost(prev=>[...prev,...data.data]))
      .catch(err => {setposterror(err.response?.data?.detail || "something fishy")});

      },[page])

      function onion(){
        setpage(page+1)
      }
     
    




    useEffect(()=>{
        api.get('/profile')
        .then(data=> setProfile(data.data[0]))
      .catch(err => {setprofileerror(err.response?.data?.detail || "something fishy")});

    },[])

    useEffect(()=>{
        api.get('/followers')
        .then(data=> setFollowers(data.data))
      .catch(err => {setfollowerror(err.response?.data?.detail || "something fishy")});

    },[unfollow])

      useEffect(()=>{
         api.get('/suggestion')
        .then(data=> setsuggestions(data.data))
      .catch(err => {setsuggesterror(err.response?.data?.detail || "something fishy")});

    
    
      },[])

    function honChange(e){
        setProfile(prev=>({
            ...prev,
            [e.target.name]:e.target.value}
        ))


    }

    const handleclick =async ()=>{
        const token=localStorage.getItem("token")

        axios.put(`http://instagramclone-frg6hsahhjhxh6em.eastasia-01.azurewebsites.net/profile/${Profile.id}`,Profile,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then(console.log("updated"))    
}

    const handleunfolow=async(id)=>{
        const token=localStorage.getItem("token")
        axios.delete(`instagramclone-frg6hsahhjhxh6em.eastasia-01.azurewebsites.net/followers/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then(alert("unfollowed"))
        .then(setunfollow(!unfollow))
        

    }
    const handleonclick=async (id,username)=>{
      const token=localStorage.getItem("token")
      axios.post('instagramclone-frg6hsahhjhxh6em.eastasia-01.azurewebsites.net/followers',{"id":id,"username":username},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
      .then(alert('fOLLOWED'))
      .then(setunfollow(!unfollow))
    }
    
    
    
    
    
  return (

    <>

    
    <div >
        <div >
                  <div className='profile1'>
                      {  Profile ?(
                        <div>
                            <div className='p3'>
                                <div className='p33'>
                                    <img src={Profile.profile_pic} alt="" />
                                    <p>{Profile.username}</p>
                                </div>
                                <div className='i1'>
                                    USERNAME:<input type="text" value={Profile.username}
                                     name='username' onChange={honChange}  /> <br /> <br />
                                    PROFILE PIC:<input type="text" value={Profile.profile_pic}
                                      name='profile_pic'  onChange={honChange}/><br /><br />
                                    <button onClick={handleclick}>Update</button>
                                </div>
                            </div>
                        </div>
                      ):profileerror?(
                        <div>
                            {profileerror}
                        </div>
                      ):(
                        <div>
                            LOADING
                        </div>
                      )}
                  </div>
                  <div className='wrapper'>
                      <div className='followers'>
                            <h1>Followers</h1>
                            {Followers.length>0?(
                                <div >
                                    {Followers.map((follo)=>(
                                        <div key={follo.id} className='uf1'>
                                            <p>{follo.username}</p>
                                            <button onClick={()=>{handleunfolow(follo.id)}}>unFollow</button>
                                        </div>
                                    ))}
                                </div>
                            ):followerror?(
                                <div>
                                    {followerror}
                                </div>
                            ):
                            
                            
                            (
                                <div>Aoading</div>
                            )}

                             </div>
                             <div className='jpost'>
                            <h1>POSTS</h1>
                            {Post.length>0 ?
                            (
                                <div>{Post.map((post)=>(
                                    <div key={post.id} className='jpostz'>
                                        
                                            
                                                <img src={post.post_image} alt="" />
                                                <div>
                      <i className="bi bi-suit-heart"></i>
                       <i className="bi bi-chat"></i>
                       <i className="bi bi-send"></i>
                    </div><br />
                                                <strong>{post.likes} LIKES</strong> <br /><br />
                                                <b>{post.caption}</b>
                                            

                                        
                                 </div>

                                 

                                    

                                    


                                    
                                ))}</div>
                            ):posterror?(
                                <div>
                                    {posterror}
                                </div>
                            )
                            :
                            
                            (

                                <div>Loading</div>
                            )}
                            
                            <button onClick={onion} >load more</button>
                        </div>


                        

                        
                        
        <div className='suggest1' >
            <b>Suggestions</b><br /><br />
          {suggestions.length > 0 ? (
            <div>
            {suggestions.map((sug)=>
              <div key={sug.id}>
                <div className='sug1'>
                  <img src={sug.profile_pic} alt="" />
                  <p>{sug.username}</p>
                  <div className='folo' onClick={()=>{handleonclick(sug.id,sug.username)}}>
                    <p>follow</p>
                  </div>
                </div>
              </div>
             )
       }
            </div>
          ):
          suggesterror?(
            <div>
                {suggesterror}
            </div>
          )
          :
          (
            <div>L</div>
          )}
        </div>
                  </div>
        
        
                  </div>
                  
    </div>
              
        
        
       
        </>
  )
}

export default Profile
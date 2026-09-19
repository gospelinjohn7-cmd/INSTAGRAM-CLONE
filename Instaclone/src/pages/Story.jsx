
import {useState,useEffect} from 'react'

import {useNavigate} from 'react-router-dom'
import api from '../services/intercept.jsx'



function Story() {


    const [story,setstory]=useState([])
    const navigate=useNavigate()

    const[profile,setprofile]=useState([])

    let tot=10;

    useEffect(()=>{
       api.get('/profile')
        .then(data=> setprofile(data.data))
      
      
    },[])
    


    useEffect(()=>{
       api.get('/story')
        .then(data=> setstory(data.data))


    },[])

  return (
    
    <div >
     
    
      <div className='st'> <div>{profile.length>0?(
        <div>{profile.map((pro)=>(
          <div key={pro.id}>
            <p>@{pro.username}</p>
          </div>
        ))}</div>
      ):(
        <div>loading</div>

      )}</div>
      </div>
      
        <div className='js1'>{tot=story.length}</div>
        
        {story.length>0?(
          <div className='stry2' >
              {story.map((storiz)=>(

                <div key={storiz.id} className='stry'>
                  <div  onClick={()=>navigate(`/story/${storiz.id}/${tot}`)}>
                  
                    <img src={storiz.profile_pic}  alt="" /><p>{storiz.username}</p>
                    
                    
                  </div>
                </div>

              ))}

          </div>


        ):( 


          
          <div>Poadin</div>


        )}

    </div>
  )
}

export default Story
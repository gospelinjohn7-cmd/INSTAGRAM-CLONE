import  { useEffect, useState } from 'react'
import { useParams,Link,useNavigate } from 'react-router-dom'

function Viewstory() {

  const {id,tot}=useParams()

  const navigate=useNavigate()

  const [story,setstory]=useState(null)
  const[error,seterror]=useState(null)

  useEffect(()=>{
    const token=localStorage.getItem("token")
    fetch(`https://instagramclone-frg6hsahhjhxh6em.eastasia-01.azurewebsites.net/story/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    .then(data=>data.json())
    .then(data=>{setstory(data); console.log(data)})
    .catch(err=>{seterror(err.response?.data?.detail || "something is fishy")})
  },[id])

  if(id>tot || id<=0){
    navigate('/app')
  }

    
  return (
    <div>
      {story?

        
          
            <div className='vs1'>
              <Link to={`/story/${Number(id)-1}/${tot}`}><i className="bi bi-arrow-left-circle-fill"></i></Link>

              <img src={story.profile_pic} alt=""/>
              <Link  to={`/story/${Number(id)+1}/${tot}`}><i className="bi bi-arrow-right-circle-fill"></i></Link>



            </div>

            
        
       
      :error? <div>{error}</div>
        :
        <div>Aoding</div>
      }
    </div>
  )
}

export default Viewstory
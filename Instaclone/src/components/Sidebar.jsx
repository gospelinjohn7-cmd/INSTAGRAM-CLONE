import React from 'react'
import { useNavigate } from 'react-router-dom'

function Sidebar() {

  const navigate=useNavigate()
  return (
    <>
    <div className='font'>
      <div className='nav1'>
        <img src="src\assets\insta.png" alt="loading" />
        <p><i className="bi bi-house-door"></i>Home</p>
        <p><i className="bi bi-camera-reels-fill"></i>Reels</p>
        <p><i className="bi bi-chat"></i>Messages </p>
        <p onClick={()=>navigate('/Search')}><i className="bi bi-search"></i>Search </p>
        <p><i className="bi bi-bell-fill"></i>Notification </p>
        <p><i className="bi bi-file-plus-fill"></i>Create </p>
        <p onClick={()=>navigate('/Profile')}><i className="bi bi-person-circle"></i>Profile </p>
      </div>
      <div className='nav2'>
        <p><i className="bi bi-three-dots"></i>More</p>
        <p><i className="bi bi-boxes"></i>Also from Meta</p>
      </div>
    </div>
    </>
  )
}

export default Sidebar
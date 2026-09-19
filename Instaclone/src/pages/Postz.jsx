import React, { useState, useEffect } from 'react';

import axios from 'axios'
import api from '../services/intercept.jsx'

function Postz() {
  const [posts, setPosts] = useState([]);
  const [error,seterror]=useState(null)

  useEffect(() => {
    api.get('/posts')
        .then(data=> setPosts(data.data))
      
      .catch(err => {seterror(error.response?.data?.detail || "something fishy")});
  }, []);

 

  return (
    <>
      <div>
        {posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              <div key={post.id}>
                <div className="p1">
                  <div className='fex'>
                    <img src={post.profile_pic}
                    
                    alt="" />
                    <h5>{post.username}</h5>
                  </div> 
                   <div className='postpic'>
                  <img src={post.image} alt="" />
                </div>
                  <div>
                      <i className="bi bi-suit-heart"></i>
                       <i className="bi bi-chat"></i>
                       <i className="bi bi-send"></i>
                    </div>
                    <b>{post.likes} Likes</b>
                    <p>{post.caption}</p>
                </div>
                
               
                    
              </div>
            ))}
          </div>
        ) : (
          <div>{error}</div>
        )}
      </div>
    </>
  );
}

export default Postz;
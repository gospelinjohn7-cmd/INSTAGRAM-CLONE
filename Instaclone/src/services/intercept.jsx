import axios from 'axios'



    const api= axios.create({
        baseURL:"https://instagramclone-frg6hsahhjhxh6em.eastasia-01.azurewebsites.net"
    })

    api.interceptors.request.use((config)=>{
        const token=localStorage.getItem("token")
        if(token){
        config.headers.authorization=`Bearer ${token}`
        }
        return config
    })

    api.interceptors.response.use((response)=>{
        return response},
        (error)=>{
            if(error.response?.status===401){
                localStorage.removeItem("token")
                window.location.href='/'
                
            }
           
            return Promise.reject(error)
        
    })




export default api
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Viewstory from './pages/Viewstory.jsx'
import Profile from './pages/Profile.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Search from './pages/Search.jsx'
import Openprofile from './pages/Openprofile.jsx'

import ProtectedRoute from './components/ProtectedRoute.jsx'
const router= createBrowserRouter([

  {
    path:"/",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>

  },
  
  
  
  {
    path:'/app',
    element:
     ( <ProtectedRoute>
        <App/>

      </ProtectedRoute>)
    ,
  },
  {
    path:'/story/:id/:tot',
    element:( <ProtectedRoute>
        <Viewstory/>

      </ProtectedRoute>),
  },
  {
    path:'/Profile',
    element:( <ProtectedRoute>
        <Profile/>

      </ProtectedRoute>)
  },
  {
    path:'/Search',
    element:( <ProtectedRoute>
        <Search/>

      </ProtectedRoute>)
  },
  {
    path:'/Openprofile/:id',
    element:( <ProtectedRoute>
        <Openprofile/>

      </ProtectedRoute>)
  }
])
createRoot(document.getElementById('root')).render(

  <RouterProvider router={router } />
   
)

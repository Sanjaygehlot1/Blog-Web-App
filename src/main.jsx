import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../src/Pages/Home.jsx'
import Signup from '../src/Pages/Signup.jsx'
import Login from '../src/Pages/Login.jsx'
import AllPosts from '../src/Pages/AllPosts.jsx'
import AddPost from '../src/Pages/AddPost.jsx'
import EditPost from '../src/Pages/EditPost.jsx'
import Post from '../src/Pages/Post.jsx'
import store from './Store/store.js'
import Protected from '../src/Protected.jsx'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: "/",
    element : <App/>,
    children: [
      {
        path : "/",
        element : <Home/>
      },
      {
        path: "/login",
        element : 
        
        <Login/>
     

      },
      {
        path : "/signup",
        element :
        
        <Signup/>
      
      },
      {
        path: "add-post",
        element : <Protected url={"/add-post"}>
        {" "}
        <AddPost/>
      </Protected>
      },
      {
        path : "/all-posts",
        element : <Protected url={"/all-posts"}>
        {" "}
        <AllPosts/>
      </Protected>
      },
      {
        path : "/edit-post/:slug",
        element: <EditPost/>
      },
      {
        path : "/post/:slug",
        element :<Post/>
      }
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)

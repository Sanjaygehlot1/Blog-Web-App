import { useEffect, useState } from 'react'
import AuthObj from '../Appwrite/Auth'
import { useDispatch } from 'react-redux'
import {login,logout} from '../src/Store/AuthSlice'
import Header from '../src/Header'
import Footer from '../src/Footer'
import { Outlet } from 'react-router-dom'

function App() {

const [loading,setloading] =useState(true)
const dispatch = useDispatch()


useEffect(()=>{
AuthObj.GetUserSessions().then((userdata)=>{
  if(userdata){
    dispatch(login({userdata}))
  }else{
    dispatch(logout())
  }
}).finally(()=>{
  setloading(false)
})
},[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
          <Header/>
          <main>
            <Outlet/>
          </main>
          <Footer/>

      </div>
    </div>

  ) : null
}

export default App

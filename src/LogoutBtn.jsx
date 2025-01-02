import React from 'react'
import AuthObj from '../Appwrite/Auth'
import { useDispatch } from 'react-redux'
import {logout} from '../src/Store/AuthSlice'
import {useNavigate } from 'react-router-dom'
function LogoutBtn() {
    const nav = useNavigate()
const dispatch =  useDispatch()
const Logout = ()=>{
    try {
        AuthObj.LogOut().then(()=>{
            dispatch(logout())
            nav("/")
        })
    } catch (error) {
        console.log("Error while Logging Out::",error.message)
        
    }
}

  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={Logout}>
        Logout
    </button>
  )
}

export default LogoutBtn

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({children,url}) {

    const navigate = useNavigate()
    const loginstatus = useSelector((state)=>state.Auth.Status)
    const [loader,setloader] = useState(true)
    useEffect(()=>{
        console.log(loginstatus)
       if(loginstatus){
        navigate(`${url}`)
       }else{
        navigate("/login")
       }
       setloader(false)
    },[loginstatus,navigate])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default Protected

import React, { useEffect, useState } from 'react'
import PostForm from '../PostForm'
import config from '../../Appwrite/Config'
import Container from '../Container'
import { useNavigate, useParams } from 'react-router-dom'
function EditPost() {

    const slug = useParams()
    const [post,setpost]= useState()
    const navigate = useNavigate()
    useEffect(()=>{
        if(slug){
            config.GetAPost(slug.slug).then((post)=>{
                setpost(post)
                console.log(post)
            })
        }
    else{
        navigate("/")
    }
    },[slug,navigate])

  return (
    <div className='py-8'>
    <Container>
      <PostForm post={post}/>
    </Container>
  </div>
  )
}

export default EditPost

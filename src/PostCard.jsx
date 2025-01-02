import React, { useEffect, useState } from 'react'
import config from '../Appwrite/Config'
import { Link } from 'react-router-dom'
function PostCard() {

    const [posts,setposts] = useState([])
    useEffect(()=>{
        config.GetAllPosts().then((posts)=>{
            setposts(posts.documents)
            console.log(posts)
        })
    },[])


  return (
    posts.length !=0 ? (
        posts.map((post)=>(
            <Link to={`/post/${post.$id}`} key={post.$id}>
    <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={config.GetImagePreview(post.FeaturedImage)} alt={post.Title}
            className='rounded-xl' />

        </div>
        <h2
        className='text-xl font-bold'
        >{post.Title}</h2>
    </div>
</Link>
        ))
    ) :  <div className="p-2 w-full flex justify-center">
    <h1 className="text-2xl font-bold hover:text-gray-500">
        No Posts
    </h1>
</div>
  )
}

export default PostCard

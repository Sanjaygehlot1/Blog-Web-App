import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Container from '../Container'
import config from '../../Appwrite/Config'
import PostCard from '../PostCard'
import { Link } from 'react-router-dom'

function Home() {

    const loginstatus = useSelector((state) => state.Auth.Status)
    const [posts, setposts] = useState([])
    useEffect(() => {
        if (loginstatus) {
            config.GetAllPosts().then((posts) => {
                setposts(posts.documents)
                console.log(posts)
            })
        }
    }, [])

    if (loginstatus && posts.length == 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No Posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else if (!loginstatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login To See Posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else {
        return (posts ? (
            posts.map((post) => post.Status ==="Active" ?(
                <Container>
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
                </Container>
            ) : null
        ))
           
         : <div className="p-2 w-full flex justify-center">
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                        No Posts
                    </h1>
                </div>
            )
        
        
    }
}

export default Home

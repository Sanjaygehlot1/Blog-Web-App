import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import config from '../../Appwrite/Config'
import { useSelector } from 'react-redux'
import Container from '../Container'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'
import Button from '../CommonComponents/Button'

function Post() {

    const [post,setpost] = useState(null)
    const navigate = useNavigate()
    const Userdata = useSelector((state)=>state.Auth.UserData)
    console.log(Userdata)
    const IsAuthor = post && Userdata ? Userdata.userdata.$id === post.UserID : null
    const slug = useParams()
    useEffect(()=>{
        if(slug){
            console.log(slug)
            config.GetAPost(slug.slug).then((post)=>{
                setpost(post)
                console.log(post)
                
            })
        }
    },[])
    
    const deletepost =async ()=>{
        if(post){
            console.log(post)
            const deleteimg = await  config.DeleteImage(post.FeaturedImage)

            if(deleteimg){
            await  config.DeletePost(post.$id)
            navigate("/all-posts")
            }
        }
    }

    const downloadimage = ()=>{
       if(post.FeaturedImage){
         config.DownloadImage(post.FeaturedImage)
         
       }
    }

    return post ? (
        <div className="py-8">
        <Container>
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img
                    src={config.GetImagePreview(post.FeaturedImage)}
                    alt={post.Title}
                    className="rounded-xl"
                />
                <div className="absolute right-6 gap-2 top-6 flex ">
    
                {IsAuthor && (
                    <div className="flex right-6 gap-2 top-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onclick={deletepost}>
                            Delete
                        </Button>
                    </div>
                )}
                       
                        <Button bgColor="bg-blue-400" onclick={downloadimage}>
                            Download
                        </Button>
                    </div>
            </div>
            <div className="w-full mb-6">
                <h1>{console.log(IsAuthor)}</h1>
                <h1 className="text-2xl font-bold">{post.Title}</h1>
                
            </div>
            <div className="browser-css">
                {parse(post.Content)}
                </div>
        </Container>
    </div>
    ) : null;
    
}

export default Post

import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import config from '../Appwrite/Config'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Button from './CommonComponents/Button'
import Input from './CommonComponents/Input'
import Select from './Select'
import RTE from '../src/RTE'

function PostForm({ post }) {
    console.log(post)
    const userdata = useSelector((state) => state.Auth.UserData)
    const [loader, setloader] = useState(false)
    const [error, seterror] = useState("")
    const navigate = useNavigate()
    const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
        Title: post ? post.Title : "",
        Content: post ? post.Content : "",
        Slug: post ? post.Slug : "",
        Status: post ? post.Status : "Active",
    })
    useEffect(()=>{
        if(post){
            setValue("Title",post.Title)
            setValue("Slug",post.$id)
            setValue("Content",post.Content)
            setValue("Status",post.Status)

        }
    },[post])
    const createpost = async (data) => {
        setloader(true)
        seterror("")
        if (post) {
            console.log(data)
            console.log("Post::", post)
            try {
                const file = data.Image[0] ? await config.UploadImage(data.Image[0]) : null

                if (file) {
                    await config.DeleteImage(post.FeaturedImage)
                }

                const update = await config.UpdatePost({
                    ...data,
                    Slug: post.$id,
                    //post.$id
                    FeaturedImage: file ? file.$id : post.FeaturedImage
                })
                if (update) {
                    setloader(false)
                    console.log(update)
                    navigate(`/post/${update.$id}`)
                }
            } catch (error) {
                console.log("Error in Updating Post::", error.message)
                seterror(error.message)
            }
        }

        else {
            try {
                if (data) {
                    console.log("Data::", data)
                    const file = await config.UploadImage(data.Image[0])
                    if (file) {
                        console.log(file)
                        console.log(userdata)
                        const create = await config.CreatePost({
                            ...data,
                            FeaturedImage: file.$id,
                            UserID: userdata.userdata.$id

                        })

                        if (create) {
                            console.log(create)
                            setloader(false)
                            navigate(`/post/${create.$id}`)
                        }


                    }

                }

            } catch (error) {
                console.log("Error in Creating Post::", error.message)
                seterror(error.message)
            }
        }
    }

    const SlugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value.trim().toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        }
        return ""
    }, [])

    React.useEffect(() => {
        const Subscription = watch((value, { name }) => {
            if (name == "Title") {
                setValue("Slug", SlugTransform(value.Title), { shouldValidate: true })
            }

        })
        return () => Subscription.unsubscribe();
    }, [watch, setValue, SlugTransform])

    return (
        <form onSubmit={handleSubmit(createpost)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    classname="mb-4"
                    {...register("Title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    classname="mb-4"
                    {...register("Slug", { required: true })}
                    onInput={(e) => {
                        setValue("Slug", SlugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="Content" control={control} defaultValue={getValues("Content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("Image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={config.GetImagePreview(post.FeaturedImage)}
                            alt={post.Title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["Active", "InActive"]}
                    label="Status"
                    className="mb-4"
                    {...register("Status", { required: true })}
                />

                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
                {loader ? "Uploading..." : ""}
                {error ? (<h2>{error}</h2>) : ""}

            </div>
        </form>
    )
}

export default PostForm

import React, { useState } from 'react'
import AuthObj from '../Appwrite/Auth'
import { useDispatch } from 'react-redux'
import { login } from '../src/Store/AuthSlice'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import Input from './CommonComponents/Input'
import Button from './CommonComponents/Button'
import { useForm } from 'react-hook-form'

function Login() {

    const [error, seterror] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { handleSubmit, register, formState: { errors } } = useForm()

    const LoginMethod = async (data) => {
        seterror("")
        try {
            if (data) {
                console.log(data)
                const userlogin = await AuthObj.Login(data)
                if (userlogin) {
                    dispatch(login(data))
                    navigate("/")
                }
            }
        } catch (error) {
            console.log("Error in Login::", error.message)
            const err = String(error.message)
            seterror(err)
        }
    }


    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                {console.log(error)}
                <form onSubmit={handleSubmit(LoginMethod)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            type="text"
                            label="Email: "
                            placeholder="Enter Email Address: "
                            {...register("email", {
                                required: { value: true, message: "Email is required" },
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        >
                        </Input>
                        {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                        <Input

                            type="password"
                            label="Password: "
                            placeholder="Enter Password: "
                            {...register("password", {
                                required: {
                                    value: true, message: "Password is required"
                                }
                            })}>

                        </Input>
                        {errors.password && <p className='text-red-600'>{errors.password.message}</p>}

                        <Button
                            type="submit"
                            className="w-full"

                        >Sign in
                        </Button>

                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login

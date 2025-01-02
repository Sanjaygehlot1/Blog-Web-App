import React, { useState } from 'react'
import AuthObj from '../Appwrite/Auth'
import { useDispatch } from 'react-redux'
import {login} from '../src/Store/AuthSlice'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from './CommonComponents/Input'
import Button from './CommonComponents/Button'
import Logo from './Logo'

function SignUp() {
  const [error,seterror] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {handleSubmit,register,formState:{errors}} = useForm()

  const signup = async (data) => {
    seterror("")
    console.log("in signup")
    try {
      if (data) {
        console.log(data)
        const account = await AuthObj.CreateAccount(data)

        if (account) {
          console.log(data)
          dispatch(login(data))
          navigate("/")
        }
        
      }
    } catch (error) {
      console.log("Error in Signup::", error)
      seterror(error.message)
    
    }


  }

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create an account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(signup)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              type="text"
              placeholder="Enter your full name"
              {...register('name', {required:{value:true,message: "Name is required"}})}
            />
             {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register('email', {required:{value:true,message: "Email is required"}})}
            />
             {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register('password',{required:{value:true,message: "Password is required"}})}
            />
             {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
            <Button type="submit"  className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

}

export default SignUp

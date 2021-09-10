import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

const SignUp: NextPage = () => {

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  async function handleSignUp(formData: any) {
    console.log(formData)
  }

  return (
    <React.Fragment>
      <Head>
        <title>Sign Up | GeekTalk</title>
      </Head>
      <div className="font-firacode flex flex-row items-center justify-center w-full h-screen bg-cyber-black text-cyber-green">
        <div className="flex flex-col items-center justify-center w-full h-full space-y-5">
          <div className="flex flex-col items-center text-center w-full max-w-xl space-y-3">
            <h1 className="font-bold text-3xl text-cyber-white">GeekTalk💻</h1>
          </div>
          <span className="text-cyber-white text-lg">Sign Up</span>
          <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col items-center w-full max-w-lg space-y-3">
            <div className="flex flex-row items-start w-full space-x-3">
              <div className="form-control flex flex-col w-full space-y-1.5">
                <input
                  className="font-light text-base px-5 py-3 w-full bg-cyber-black border border-cyber-white border-opacity-20 focus:border-cyber-green focus:outline-none"
                  type="text"
                  placeholder="Full Name"
                  {...register("fullname", { required: true })}
                />
                {errors.fullname && <span className="font-light text-[10px] text-cyber-white ml-1">Full Name is required</span>}
              </div>
              <div className="form-control flex flex-col w-full space-y-1.5">
                <input
                  className="font-light text-base px-5 py-3 w-full bg-cyber-black border border-cyber-white border-opacity-20 focus:border-cyber-green focus:outline-none"
                  type="text"
                  placeholder="Create Username"
                  {...register("username", { required: true })}
                />
                {errors.username && <span className="font-light text-[10px] text-cyber-white ml-1">Username is required</span>}
              </div>
            </div>
            <div className="form-control flex flex-col w-full space-y-1.5">
              <input
                className="font-light text-base px-5 py-3 w-full bg-cyber-black border border-cyber-white border-opacity-20 focus:border-cyber-green focus:outline-none"
                type="text"
                min={0}
                placeholder="Phone Number"
                {...register("phone", { required: true, pattern: { value: /\d+/, message: "Invalid Phone Number" } })}
              />
              {errors.phone && <span className="font-light text-[10px] text-cyber-white ml-1">{errors.phone.message || 'Phone Number is required'}</span>}
            </div>
            <div className="form-control flex flex-col w-full space-y-1.5">
              <input
                className="font-light text-base px-5 py-3 w-full bg-cyber-black border border-cyber-white border-opacity-20 focus:border-cyber-green focus:outline-none"
                type="text"
                placeholder="Email"
                {...register("email", { required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Invalid Email" } })}
              />
              {errors.email && <span className="font-light text-[10px] text-cyber-white ml-1">{errors.email.message || 'Email is required'}</span>}
            </div>
            <div className="flex flex-row items-start w-full space-x-3">
              <div className="form-control flex flex-col w-full space-y-1.5">
                <input
                  className="font-light text-base px-5 py-3 w-full bg-cyber-black border border-cyber-white border-opacity-20 focus:border-cyber-green focus:outline-none"
                  type="password"
                  placeholder="Create Password"
                  {...register("password", { required: true })}
                />
                {errors.password && <span className="font-light text-[10px] text-cyber-white ml-1">Password is required</span>}
              </div>
              <div className="form-control flex flex-col w-full space-y-1.5">
                <input
                  className="font-light text-base px-5 py-3 w-full bg-cyber-black border border-cyber-white border-opacity-20 focus:border-cyber-green focus:outline-none"
                  type="password"
                  placeholder="Re-type Password"
                  {...register("password", { required: true })}
                />
                {errors.password && <span className="font-light text-[10px] text-cyber-white ml-1">Password is required</span>}
              </div>
            </div>
            <div className="form-control flex w-full">
              {!isSubmitting && (
                <button 
                  className="font-bold text-base px-5 py-3 w-full text-cyber-black bg-cyber-green focus:outline-none"
                  type="submit"
                >
                  Sign Up
                </button>
              )}
              {isSubmitting && (
                <div className="font-bold text-base px-5 py-3 w-full cursor-wait text-center text-cyber-black bg-cyber-green focus:outline-none">
                  Signing Up...
                </div>
              )}
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <Link href="/signin">
                <a className="font-light text-cyber-white text-xs hover:underline">Back to Sign In</a>
              </Link>
            </div>
          </form>
          <footer className="absolute bottom-0 w-full bg-cyber-black">
            <div className="flex flex-col items-center justify-center w-full py-3">
              <span className="font-light text-xs text-white">© Osomware { new Date().getFullYear() }, All rights reserved.</span>
            </div>
          </footer>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SignUp

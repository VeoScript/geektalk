import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'

interface FormData {
  name: string
  username: string
  phone: string
  email: string
  password: string
  repassword: string
}

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

const SignUp: NextPage = () => {

  const { data: users } = useSWR('/api/auth/users', fetcher, {
    refreshInterval: 1000
  })
  
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>()

  async function handleSignUp(formData: FormData) {
    const username = formData.username
    const phone = formData.phone
    const email = formData.email
    const password = formData.password
    const repassword = formData.repassword

    const phone_credential = users.some((user: { phone: string }) => user.phone === phone)
    const username_credential = users.some((user: { username: string }) => user.username === username)
    const email_credential = users.some((user: { email: string }) => user.email === email)

    if (username_credential) {
      toast('Username is already exist.',
        {
          icon: '🛡️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      )
      return
    }

    if (phone_credential) {
      toast('The phone number is already exist.',
        {
          icon: '🛡️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      )
      return
    }

    if (email_credential) {
      toast('Email is already exist.',
        {
          icon: '🛡️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      )
      return
    }

    if (password !== repassword) {
      toast('Password not matched, try again.',
        {
          icon: '🛡️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      )
      return
    }

    await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    
    reset()
    Router.replace('/signin')
  }

  return (
    <React.Fragment>
      <Head>
        <title>Sign Up | GeekTalk</title>
      </Head>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="font-firacode flex flex-row items-center justify-center w-full h-screen cursor-default bg-cyber-black text-cyber-green">
        <div className="flex flex-col items-center justify-center w-full h-full space-y-5">
          <div className="flex flex-col items-center text-center w-full max-w-xl space-y-3">
            <h1 className="font-bold text-3xl text-cyber-white">&gt; GeekTalk💻</h1>
          </div>
          <span className="text-cyber-white text-lg">Sign Up</span>
          <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col items-center w-full max-w-lg space-y-3">
            <div className="flex flex-row items-start w-full space-x-3">
              <div className="form-control flex flex-col w-full space-y-1.5">
                <input
                  className="font-light text-base px-5 py-3 w-full bg-cyber-black border border-cyber-white border-opacity-20 focus:border-cyber-green focus:outline-none"
                  type="text"
                  placeholder="Full Name"
                  {...register("name", { required: true })}
                />
                {errors.name && <span className="font-light text-[10px] text-cyber-white ml-1">Full Name is required</span>}
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
                  {...register("repassword", { required: true })}
                />
                {errors.repassword && <span className="font-light text-[10px] text-cyber-white ml-1">Password is required</span>}
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

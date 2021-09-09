import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

const Home: NextPage = () => {

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  async function handleLogin(formData: any) {
    console.log(formData)
  }

  return (
    <React.Fragment>
      <Head>
        <title>Geek Talk</title>
      </Head>
      <div className="font-firacode flex flex-row items-center justify-center w-full h-screen bg-cyber-black text-cyber-green">
        <div className="flex flex-col items-center justify-center w-full h-full space-y-5">
          <div className="flex flex-col items-center text-center w-full max-w-xl space-y-3">
            <h1 className="font-bold text-3xl text-cyber-white">GeekTalk💻</h1>
            <p className="font-light text-sm">Try to ask some questions, maybe we have an answers for that.</p>
          </div>
          <span className="text-cyber-white text-lg">Sign In</span>
          <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col items-center w-full max-w-lg space-y-3">
            <div className="form-control flex flex-col w-full space-y-1.5">
              <input
                className="font-light text-base px-5 py-3 w-full bg-cyber-black border border-cyber-dim focus:border-cyber-green focus:outline-none"
                type="text"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email && <span className="font-light text-[10px] text-cyber-white ml-1">Email is required</span>}
            </div>
            <div className="form-control flex flex-col w-full space-y-1.5">
              <input
                className="font-light text-base px-5 py-3 w-full bg-cyber-black border border-cyber-dim focus:border-cyber-green focus:outline-none"
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.password && <span className="font-light text-[10px] text-cyber-white ml-1">Password is required</span>}
            </div>
            <div className="form-control flex w-full">
              <button 
                className="font-bold text-base px-5 py-3 w-full text-cyber-black bg-cyber-green focus:outline-none"
                type="submit"
              >
                Sign In
              </button>
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <Link href="/">
                <a className="font-light text-cyber-white text-xs hover:underline">Create Account</a>
              </Link>
              <Link href="/">
                <a className="font-light text-cyber-white text-xs hover:underline">Forgot Password?</a>
              </Link>
            </div>
          </form>
          <footer className="absolute bottom-0 w-full bg-cyber-black">
            <div className="flex flex-col items-center justify-center w-full py-3">
              <span className="font-light text-xs text-white">© Osomware 2021, All rights reserved.</span>
            </div>
          </footer>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home

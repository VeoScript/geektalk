import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>GeekTalk</title>
      </Head>
      <div className="font-firacode flex flex-row items-center justify-center w-full h-screen bg-cyber-black text-cyber-green">
        <span>Home</span>
      </div>
    </React.Fragment>
  )
}

export default Home

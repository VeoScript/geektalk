import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

const Geek404: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Page Not Found | GeekTalk</title>
      </Head>
      <div className="font-pangolin flex flex-col items-center justify-center w-full h-screen space-y-5 bg-cyber-black text-cyber-green">
        <h1 className="font-bold text-3xl">404 - Page Not Found</h1>
        <Link href="/">
          <a className="text-xl text-cyber-white text-opacity-50 hover:underline">
            <span>&gt;</span> Return to Index
          </a>
        </Link>
      </div>
    </React.Fragment>
  )
}

export default Geek404

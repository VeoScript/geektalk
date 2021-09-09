import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '~/layouts/default'
import ChatHeader from '~/components/ChatTerminal/ChatHeader'
import ChatBody from '~/components/ChatTerminal/ChatBody'
import ChatForm from '~/components/ChatTerminal/ChatForm'

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>GeekTalk</title>
      </Head>
      <Layout>
        <div className="relative flex flex-col w-full max-w-full h-full overflow-hidden">
          <ChatHeader />
          <ChatBody />
          <ChatForm />
        </div>
      </Layout>
    </React.Fragment>
  )
}

export default Home

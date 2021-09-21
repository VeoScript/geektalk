import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '~/layouts/default'
import ChatHeader from '~/components/ChatTerminal/ChatHeader'
import ChatBody from '~/components/ChatTerminal/ChatBody'
import ChatForm from '~/components/ChatTerminal/ChatForm'
import ChatParticipants from '~/components/ChatTerminal/ChatParticipants'

const Server: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Server Name | GeekTalk</title>
      </Head>
      <Layout>
        <div className="relative flex flex-row w-full max-w-full h-full overflow-hidden">
          <div className="flex flex-col w-full">
            <ChatHeader />
            <ChatBody />
            <ChatForm />
          </div>
          <div className="flex flex-col w-full max-w-[15rem] border-l border-cyber-white border-opacity-10 bg-cyber-black">
            <ChatParticipants />
          </div>
        </div>
      </Layout>
    </React.Fragment>
  )
}

export default Server

import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import DefaultErrorPage from 'next/error'
import withSession from '~/lib/Session'
import prisma from '~/lib/Prisma'
import React from 'react'
import Head from 'next/head'
import Layout from '~/layouts/default'
import ChatHeader from '~/components/ChatTerminal/ChatHeader'
import ChatBody from '~/components/ChatTerminal/ChatBody'
import ChatForm from '~/components/ChatTerminal/ChatForm'
import ChatParticipants from '~/components/ChatTerminal/ChatParticipants'

interface GeekProps {
  host: any
  joined_servers: any
  server_data: any
}

const Server: NextPage<GeekProps> = ({ host, joined_servers, server_data }) => {
  return (
    <React.Fragment>
      <Head>
        <title>{ server_data[0].name } | GeekTalk</title>
      </Head>
      <Layout host={host} joined_servers={joined_servers}>
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

export const getServerSideProps: GetServerSideProps = withSession(async function (context: any) {
  const { serverName } = context.query
  const user = context.req.session.get('user')

  if (!user) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  const host = await prisma.user.findFirst({
    where: {
      username: user.username
    }
  })

  const joined_servers = await prisma.joinedServer.findMany({
    where: {
      userId: user.id
    },
    select: {
      id: true,
      userId: true,
      indicator: true,
      serverName: true,
      servers: {
        select: {
          name: true,
          status: true,
          passcode: true
        }
      }
    }
  })

  const server_data = await prisma.server.findMany({
    where: {
      userId: user.id,
      name: serverName
    },
    select: {
      id: true,
      name: true,
      chats: {
        select: {
          id: true,
          message: true,
          serverId: true,
          userId: true
        }
      }
    }
  })

  // check if there is a server data in this page, else redirect to 404 page.
  if (!server_data[0]) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      host,
      joined_servers,
      server_data
    }
  }
})

export default Server

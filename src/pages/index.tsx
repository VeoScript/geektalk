import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import withSession from '~/lib/Session'
import prisma from '~/lib/Prisma'
import React from 'react'
import Head from 'next/head'
import Layout from '~/layouts/default'
import ServerHeader from '~/components/ServersTerminal/ServerHeader'
import ServerBody from '~/components/ServersTerminal/ServerBody'

interface GeekProps {
  host: any
  servers: any
  joined_servers: any
}

const DiscoverServers: NextPage<GeekProps> = ({ host, servers, joined_servers }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Discover Servers | GeekTalk</title>
      </Head>
      <Layout host={host} joined_servers={joined_servers}>
        <div className="relative flex flex-col w-full max-w-full h-full overflow-hidden">
          <ServerHeader />
          <ServerBody
            host={host}
            servers={servers}
            joined_servers={joined_servers}
          />
        </div>
      </Layout>
    </React.Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = withSession(async function (context: any) {
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

  const servers = await prisma.server.findMany({
    orderBy: [
      {
        date: 'desc'
      }
    ],
    select: {
      id: true,
      name: true,
      status: true,
      passcode: true,
      joined_servers: {
        select: {
          indicator: true,
          userId: true
        }
      }
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

  return {
    props: {
      host,
      servers,
      joined_servers
    }
  }
})

export default DiscoverServers
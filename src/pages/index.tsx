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
}

const DiscoverServers: NextPage<GeekProps> = ({ host, servers }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Discover Servers | GeekTalk</title>
      </Head>
      <Layout host={host}>
        <div className="relative flex flex-col w-full max-w-full h-full overflow-hidden">
          <ServerHeader />
          <ServerBody servers={servers} />
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
      name: true
    }
  })

  return {
    props: {
      host,
      servers
    }
  }
})

export default DiscoverServers
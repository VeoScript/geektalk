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
  hostname: any
}

const DiscoverServers: NextPage<GeekProps> = ({ hostname }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Discover Servers | GeekTalk</title>
      </Head>
      <Layout hostname={hostname}>
        <div className="relative flex flex-col w-full max-w-full h-full overflow-hidden">
          <ServerHeader />
          <ServerBody />
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

  const hostname = await prisma.user.findFirst({
    where: {
      username: user.username
    }
  })

  return {
    props: {
      hostname
    }
  }
})

export default DiscoverServers
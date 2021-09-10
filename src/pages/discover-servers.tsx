import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Layout from '~/layouts/default'
import ServerHeader from '~/components/ServersTerminal/ServerHeader'
import ServerBody from '~/components/ServersTerminal/ServerBody'

const DiscoverServers: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Discover Servers | GeekTalk</title>
      </Head>
      <Layout>
        <div className="relative flex flex-col w-full max-w-full h-full overflow-hidden">
          <ServerHeader />
          <ServerBody />
        </div>
      </Layout>
    </React.Fragment>
  )
}

export default DiscoverServers
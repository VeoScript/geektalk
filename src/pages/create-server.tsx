import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Layout from '~/layouts/default'
import CreateServerHeader from '~/components/CreateServer/ServerHeader'
import CreateServerBody from '~/components/CreateServer/ServerBody'
import CreateServerForm from '~/components/CreateServer/ServerForm'

const CreateServer: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Create Server | GeekTalk</title>
      </Head>
      <Layout>
        <div className="relative flex flex-col w-full max-w-full h-full overflow-hidden">
          <CreateServerHeader />
          <CreateServerForm />
          <CreateServerBody />
        </div>
      </Layout>
    </React.Fragment>
  )
}

export default CreateServer
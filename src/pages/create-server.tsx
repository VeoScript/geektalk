import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import withSession from '~/lib/Session'
import prisma from '~/lib/Prisma'
import React from 'react'
import Head from 'next/head'
import Layout from '~/layouts/default'
import CreateServerHeader from '~/components/CreateServer/ServerHeader'
import CreateServerBody from '~/components/CreateServer/ServerBody'
import CreateServerForm from '~/components/CreateServer/ServerForm'

interface GeekProps {
  host: any
}

const CreateServer: NextPage<GeekProps> = ({ host }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Create Server | GeekTalk</title>
      </Head>
      <Layout host={host}>
        <div className="relative flex flex-col w-full max-w-full h-full overflow-hidden">
          <CreateServerHeader />
          <CreateServerForm />
          <CreateServerBody />
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

  return {
    props: {
      host
    }
  }
})

export default CreateServer
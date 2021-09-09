import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '~/layouts/default'

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>GeekTalk</title>
      </Head>
      <Layout>
        <span>Hello World</span>
      </Layout>
    </React.Fragment>
  )
}

export default Home

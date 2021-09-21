import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter()
  React.useEffect(() => {
    router.push('/discover-servers')
  })
  return(
    <Head>
      <title>GeekTalk</title>
    </Head>
  )
}
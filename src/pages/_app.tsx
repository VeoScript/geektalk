import '~/styles/tailwind.css'
import NextNProgress from '~/lib/NextProgressbar'
import React from 'react'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <NextNProgress />
      <Component {...pageProps} />
    </React.Fragment>
  )
}
export default MyApp

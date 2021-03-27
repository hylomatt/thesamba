import React from 'react'
import UserContext from '../utils/providers/UserProvider'
import Head from 'next/head'

import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

function MyApp ({ Component, pageProps }) {
  return (
    <UserContext>
      <Head>
        <title>The Samba</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </UserContext>
  )
}

export default MyApp

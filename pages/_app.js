import React, { useEffect } from 'react'
import UserContext from '../utils/providers/UserProvider'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import usePageTracking from '../utils/usePageTracking'

import theme from '../utils/theme'

import '../styles/globals.css'
// import 'tailwindcss/tailwind.css'

function App({ Component, pageProps }) {
  usePageTracking()

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <UserContext>
      <Head>
        <title>The Samba</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </UserContext>
  )
}

export default App

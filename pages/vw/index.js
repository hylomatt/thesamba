import React from 'react'
import Head from 'next/head'

import { Box, Typography } from '@material-ui/core'

import { getHome } from '../../utils/api'
import HeaderTop from '../../components/HeaderTop'
import Header from '../../components/Header'

export default function Home({ data }) {
  return (
    <Box p={{ xs: 0, sm: 1 }}>
      <Head>
        <title>{data.title}</title>
      </Head>

      <HeaderTop data={data.preHeader} loggedIn={data.loggedIn} />
      <Header data={data.header} items={data.nav} selected="Home" />

      <Box px={{ xs: 1, sm: 0 }} py={1}>
        <Typography>home</Typography>
      </Box>
    </Box>
  )
}

export async function getServerSideProps(context) {
  console.log('=== home:', context.req.url)
  return {
    props: {
      data: await getHome(context.req.url)
    }
  }
}

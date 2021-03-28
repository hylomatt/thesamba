import Head from 'next/head'
import React from 'react'

import { Box, Typography } from '@material-ui/core'

import { getGallery } from '../../../utils/api'
import HeaderTop from '../../../components/HeaderTop'
import Header from '../../../components/Header'

export default function ForumIndex({ data }) {
  return (
    <Box p={{ xs: 0, sm: 1 }}>
      <Head>
        <title>{data.title}</title>
      </Head>

      <HeaderTop data={data.preHeader} loggedIn={data.loggedIn} />
      <Header data={data.header} items={data.nav} selected="Home" />

      <Box px={{ xs: 1, sm: 0 }} py={1}>
        <Typography>gallery</Typography>
      </Box>
    </Box>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      data: await getGallery(context.req.url)
    }
  }
}

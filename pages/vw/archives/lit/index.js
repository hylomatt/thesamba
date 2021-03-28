import Head from 'next/head'
import React from 'react'

import { Box, Typography } from '@material-ui/core'

import { getArchives } from '../../../../utils/api'
import HeaderTop from '../../../../components/HeaderTop'
import Header from '../../../../components/Header'

export default function TechnicalIndex({ data }) {
  return (
    <Box p={{ xs: 0, sm: 1 }}>
      <Head>
        <title>{data.title}</title>
      </Head>

      <HeaderTop data={data.preHeader} loggedIn={data.loggedIn} />
      <Header data={data.header} items={data.nav} selected="Home" />

      <Box px={{ xs: 1, sm: 0 }} py={1}>
        <Typography>archives</Typography>
      </Box>
    </Box>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      data: await getArchives(context.req.url)
    }
  }
}

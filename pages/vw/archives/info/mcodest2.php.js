import Head from 'next/head'
import React from 'react'

import { Box, Typography } from '@material-ui/core'

import { getTechnical } from '../../../../utils/getters'
import HeaderTop from '../../../../components/HeaderTop'
import Header from '../../../../components/Header'

export default function TechnicalIndex({ data }) {
  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.title}</title>
      </Head>

      <HeaderTop data={data.preHeader} loggedIn={data.loggedIn} />
      <Header data={data.header} items={data.nav} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Typography>M-Codes</Typography>
      </Box>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const { cookies, data } = await getTechnical(context.req)
  context.res.setHeader('set-cookie', cookies || [])

  return {
    props: {
      data
    }
  }
}

import Head from 'next/head'
import React from 'react'

import { Box, Typography } from '@material-ui/core'

import { getTechnical } from '../../../../utils/getters'
import Header from '../../../../components/Header'

export default function TechnicalIndex({ data }) {
  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Typography>Dealer Listings</Typography>
      </Box>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const { data, ...rest } = await getTechnical(context.req)
  context.res.setHeader('set-cookie', rest.cookies || [])

  return {
    props: {
      data
    }
  }
}

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { Box, Typography, Grid } from '@mui/material'
import { withStyles } from '@mui/styles'

import { getHome } from '../../utils/getters'
import Header from '../../components/Header'

import constants from '../../utils/constants'

export default withStyles({
  events: {
    '& > div': {
      marginBottom: '8px',
      fontSize: 13
    }
  }
})(({ data, classes }) => {
  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.base.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Typography>Donate</Typography>
      </Box>
    </Box>
  )
})

export async function getServerSideProps(context) {
  const { data, ...rest } = await getHome(context.req)
  context.res.setHeader('set-cookie', rest.cookies || [])

  return {
    props: {
      data
    }
  }
}

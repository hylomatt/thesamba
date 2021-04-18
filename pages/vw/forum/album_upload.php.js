import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { Box, Typography, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { withStyles } from '@material-ui/core/styles'

import { getHome } from '../../../utils/getters'
import Header from '../../../components/Header'

export default withStyles({
  root: {
    color: 'white'
  }
})(({ data, classes }) => {
  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.base.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Typography>Add photo</Typography>
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

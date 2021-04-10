import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { Box, Typography, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { withStyles } from '@material-ui/core/styles'

import { getHome } from '../../../utils/getters'
import HeaderTop from '../../../components/HeaderTop'
import Header from '../../../components/Header'

export default withStyles({
  root: {
    color: 'white'
  }
})(({ data, classes }) => {
  console.log(data)

  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.title}</title>
      </Head>

      <HeaderTop data={data.preHeader} loggedIn={data.loggedIn} />
      <Header data={data.header} items={data.nav} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Typography>RSS feeds</Typography>
      </Box>
    </Box>
  )
})

export async function getServerSideProps(context) {
  const { cookies, data } = await getHome(context.req)
  context.res.setHeader('set-cookie', cookies || [])

  return {
    props: {
      data
    }
  }
}

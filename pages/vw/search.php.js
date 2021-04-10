import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { Box, Typography, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { getHome } from '../../utils/getters'
import HeaderTop from '../../components/HeaderTop'
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
        <title>{data.title}</title>
      </Head>

      <HeaderTop data={data.preHeader} loggedIn={data.loggedIn} />
      <Header data={data.header} items={data.nav} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Typography>Search</Typography>
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

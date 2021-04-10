import Head from 'next/head'
import React from 'react'
import Link from 'next/link'

import { Box, Typography, Grid, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, Hidden } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'

import { getClassifieds } from '../../../utils/getters'
import Header from '../../../components/Header'

import constants from '../../../utils/constants'

export default withStyles((theme) => ({
  root: {
    color: 'white'
  },
  list: {
    width: 250
  },

  accRoot: {
    width: '100%'
  },
  heading: {
    display: 'block',
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0
  },

  popper: {
    minWidth: 200
  },

  menuItem: {
    justifyContent: 'center'
  },

  menuBtn: {
    height: 64
  }
}))(({ data, classes }) => {
  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Typography>Place an ad</Typography>
      </Box>
    </Box>
  )
})

export async function getServerSideProps(context) {
  const { data, ...rest } = await getClassifieds(context.req)
  context.res.setHeader('set-cookie', rest.cookies || [])

  return {
    props: {
      data
    }
  }
}

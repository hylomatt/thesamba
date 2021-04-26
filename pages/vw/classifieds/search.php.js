import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { Box, Typography, Grid, Hidden, IconButton, Paper } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import SearchIcon from '@material-ui/icons/Search'
import { withStyles } from '@material-ui/core/styles'

import { getClassifiedSearch } from '../../../utils/getters'
import Header from '../../../components/Header'
import ClassifiedsSearch from '../../../components/ClassifiedsSearch'
import Pagination from '../../../components/Pagination'
import Breadcrumb from '../../../components/Breadcrumb'

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
  },

  searchBtn: {
    padding: '8px 0'
  }
}))(({ data, classes }) => {
  const [showSearch, setShowSearch] = useState(false)

  const handleShowSearch = () => {
    setShowSearch(!showSearch)
  }

  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.base.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Box mb={2}>
          <Typography variant="h4">{data.page.title}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h5">{data.page.title2}</Typography>
        </Box>
        <Box mb={2}>
          <Breadcrumb crumbs={data.page.nav} />
        </Box>

        <Box align="center" mb={2}>
          <Paper variant="outlined" onClick={handleShowSearch}>
            <IconButton aria-label="search" className={classes.searchBtn} size="small" variant="outlined">
              <SearchIcon fontSize="small" /> Revise search
            </IconButton>
          </Paper>
        </Box>

        <Hidden smDown>
          <Box bgcolor="primary.main">
            <Grid container>
              <Grid item xs={2}>
                <Box p={1} px={2}>
                  <Typography align="center" className={classes.root}>
                    Picture
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={5}>
                <Box p={1} px={2}>
                  <Typography className={classes.root}>Description</Typography>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box p={1} px={2}>
                  <Typography align="center" className={classes.root}>
                    Price
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box p={1} px={2}>
                  <Typography align="center" className={classes.root}>
                    Date/Location
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Hidden>

        {data.page.ads.map((el, i) => (
          <Box bgcolor={i % 2 ? 'white' : 'secondary.light'} key={`classifies-ad-${el.title}-${i}`}>
            <Grid container>
              <Grid item xs={6} sm={4} md={2}>
                <Box p={1} height="100%">
                  <Link href={el.href} passHref>
                    <a style={{ display: 'block', height: '100%' }}>
                      {!el.img.src.includes('blank.gif')
                        ? (
                          <div style={{ position: 'relative', width: '100%', height: '120px', paddingBottom: '20%' }}>
                            <Image src={el.img.src} alt={el.img.alt} layout="fill" objectFit="cover" />
                          </div>
                        )
                        : (
                          <Skeleton variant="rect" height="100%" animation="wave" />
                        )}
                    </a>
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={5} container direction="column">
                <Grid item style={{ flex: 'auto' }}>
                  <Box p={1} px={1}>
                    <Link href={el.href} passHref>
                      <Typography component="a">{el.title}</Typography>
                    </Link>
                  </Box>
                </Grid>
                <Grid item>
                  <Box p={1} px={1}>
                    <Typography align="right">{el.price}</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Hidden smDown>
                <Grid item xs={6} sm={6} md={5}>
                  <Box p={1} px={1}>
                    <Link href={el.href} passHref>
                      <Typography component="a">{el.title}</Typography>
                    </Link>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Box p={1} px={{ xs: 1, md: 2 }}>
                    <Typography align="center">{el.price}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <Box p={1} px={2} align="right">
                    <Typography display="block">{el.date}</Typography>
                    <Typography display="block">{el.location}</Typography>
                    <Link href={el.seller.href} passHref>
                      <Typography component="a">{el.seller.title}</Typography>
                    </Link>
                  </Box>
                </Grid>
              </Hidden>
            </Grid>
          </Box>
        ))}
      </Box>

      <Pagination pages={data.page.pages} />

      <ClassifiedsSearch open={showSearch} setOpen={setShowSearch} />
    </Box>
  )
})

export async function getServerSideProps(context) {
  const { data, ...rest } = await getClassifiedSearch(context.req)
  context.res.setHeader('set-cookie', rest.cookies || [])

  return {
    props: {
      data
    }
  }
}

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { Box, Typography, Grid, Hidden } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { getGallery } from '../../../utils/getters'
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
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box mb={1} border={1} borderColor="primary.main" align="center">
              <Box bgcolor="primary.main" p={1}>
                <Typography align="center" className={classes.root}>
                  Latest Entry
                </Typography>
              </Box>
              <Box p={1}>
                <Link href={data.gallery.latestEntry.href}>
                  <a>
                    <img src={data.gallery.latestEntry.img.src} />
                  </a>
                </Link>
                <Typography>{data.gallery.latestEntry.topictitle}</Typography>
                <Typography dangerouslySetInnerHTML={{ __html: data.gallery.latestEntry.postbody }} />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box mb={1} border={1} borderColor="primary.main" align="center">
              <Box bgcolor="primary.main" p={1}>
                <Typography align="center" className={classes.root}>
                  Stolen
                </Typography>
              </Box>
              <Box p={1}>
                <Link href={data.gallery.stolen.href}>
                  <a>
                    <img src={data.gallery.stolen.img.src} />
                  </a>
                </Link>
                <Typography>{data.gallery.stolen.topictitle}</Typography>
                <Typography dangerouslySetInnerHTML={{ __html: data.gallery.stolen.postbody }} />
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Hidden xsDown>
          <Box bgcolor="primary.main">
            <Grid container>
              <Grid item xs={9}>
                <Box p={1}>
                  <Typography align="center" className={classes.root}>
                    Category
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Box p={1}>
                  <Typography align="right" className={classes.root}>
                    Pics
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box p={1}>
                  <Typography align="right" className={classes.root}>
                    Last Post
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Hidden>

        <Box mb={1} border={1} borderColor="primary.main">
          <Box bgcolor="primary.main" p={1}>
            <Grid container>
              <Grid item xs={10}>
                <Typography className={classes.root}>Categories</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography align="right" className={classes.root}>
                  Pics
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box p={1} pt={2}>
            {data.gallery.categories.map((cat, i) => (
              <Box mb={1} key={`mobile-categories-${i}`}>
                <Grid container>
                  <Grid item xs={10}>
                    <Link href={cat.href}>
                      <Typography component="a">{cat.title}</Typography>
                    </Link>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography align="right">{cat.pics}</Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
})

export async function getServerSideProps(context) {
  const { cookies, data } = await getGallery(context.req)
  context.res.setHeader('set-cookie', cookies || [])

  return {
    props: {
      data
    }
  }
}

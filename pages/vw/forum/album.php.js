import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { Box, Typography, Grid, Hidden } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { getGallery } from '../../../utils/getters'
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
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box mb={1} border={1} borderColor="primary.main" align="center">
              <Box bgcolor="primary.main" p={1}>
                <Typography align="center" className={classes.root}>
                  Latest Entry
                </Typography>
              </Box>
              <Box p={1}>
                <Link href={data.page.latestEntry.href}>
                  <a>
                    <img src={data.page.latestEntry.img.src} />
                  </a>
                </Link>
                <Typography>{data.page.latestEntry.topictitle}</Typography>
                <Typography component="div" dangerouslySetInnerHTML={{ __html: data.page.latestEntry.postbody }} />
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
                <Link href={data.page.stolen.href}>
                  <a>
                    <img src={data.page.stolen.img.src} />
                  </a>
                </Link>
                <Typography>{data.page.stolen.topictitle}</Typography>
                <Typography component="div" dangerouslySetInnerHTML={{ __html: data.page.stolen.postbody }} />
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
            {data.page.categories.map((cat, i) => (
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
  const { data, ...rest } = await getGallery(context.req)
  context.res.setHeader('set-cookie', rest.cookies || [])

  return {
    props: {
      data
    }
  }
}

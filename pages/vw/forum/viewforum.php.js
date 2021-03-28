import Head from 'next/head'
import React from 'react'
import Link from 'next/link'

import { makeStyles } from '@material-ui/core/styles'
import { Box, Grid, Typography, Hidden } from '@material-ui/core'

import { getForum } from '../../../utils/api'
import HeaderTop from '../../../components/HeaderTop'
import Header from '../../../components/Header'

const useStyles = makeStyles({
  root: {
    color: 'white'
  }
})

export default function ForumDetail({ data }) {
  const classes = useStyles()

  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.title}</title>
      </Head>

      <HeaderTop data={data.preHeader} loggedIn={data.loggedIn} />
      <Header data={data.header} items={data.nav} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Hidden xsDown>
          <Box bgcolor="primary.main">
            <Grid container>
              <Grid item xs={7}>
                <Box p={1}>
                  <Typography align="center" className={classes.root}>
                    Topics
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Box p={1}>
                  <Typography align="right" className={classes.root}>
                    Replies
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Box p={1}>
                  <Typography align="right" className={classes.root}>
                    Author
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Box p={1}>
                  <Typography align="right" className={classes.root}>
                    Views
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

        {data.forumGroups.map((el, i) => (
          <Box mb={2} key={`forumGroup-${i}`}>
            <Box p={1} bgcolor="secondary.light">
              <Link href={el.href || ''} passHref>
                <Typography component="a" variant="subtitle1">
                  {el.title}
                </Typography>
              </Link>
            </Box>
            {el.items.map((subEl, subI) => (
              <Box py={1} px={1} mb={1} key={`forum-${i}-${subI}`}>
                <Grid container>
                  <Grid item xs={12} sm={7}>
                    <Box mb={{ xs: 1, sm: 0 }}>
                      {/* {subEl.newPosts ? '!' : ''} */}

                      <Link href={subEl.href || ''} passHref>
                        <Typography component="a" className="font-semibold">
                          {subEl.title}
                        </Typography>
                      </Link>
                      <Typography>{subEl.description}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={3} sm={1}>
                    <Typography align="right">{subEl.replies}</Typography>
                  </Grid>
                  <Grid item xs={3} sm={1}>
                    <Typography align="right">{subEl.author.text}</Typography>
                  </Grid>
                  <Grid item xs={3} sm={1}>
                    <Typography align="right">{subEl.views}</Typography>
                  </Grid>
                  <Grid item xs={3} sm={2}>
                    <Typography align="right">{subEl.lastPost.text}</Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      data: await getForum(context.req.url)
    }
  }
}

import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles'
import { Box, Grid, Typography, Hidden } from '@material-ui/core'

import { getForums } from '../../../utils/getters'
import HeaderTop from '../../../components/HeaderTop'
import Header from '../../../components/Header'

const useStyles = makeStyles({
  root: {
    color: 'white'
  }
})

export default function ForumIndex({ data }) {
  const classes = useStyles()
  const router = useRouter()

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
              <Grid item xs={8}>
                <Box p={1}>
                  <Typography align="center" className={classes.root}>
                    Forum
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Box p={1}>
                  <Typography align="right" className={classes.root}>
                    Topics
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Box p={1}>
                  <Typography align="right" className={classes.root}>
                    Posts
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
              <Link href={`${router.asPath}${el.href}`} passHref>
                <Typography component="a" variant="subtitle1">
                  {el.title}
                </Typography>
              </Link>
            </Box>
            {el.items.map((subEl, subI) => (
              <Box py={1} px={1} mb={1} key={`forum-${i}-${subI}`}>
                <Grid container>
                  <Grid item xs={12} sm={8}>
                    <Box mb={{ xs: 1, sm: 0 }}>
                      {/* {subEl.newPosts  ? '!' : '-'} */}

                      <Link href={`${router.asPath}${subEl.href}`} passHref>
                        <Typography component="a" className="font-semibold">
                          {subEl.title}
                        </Typography>
                      </Link>
                      <Typography>{subEl.description}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={3} sm={1}>
                    <Typography align="right">{subEl.topics}</Typography>
                  </Grid>
                  <Grid item xs={3} sm={1}>
                    <Typography align="right">{subEl.posts}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={2}>
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
  const { cookies, data } = await getForums(context.req)
  context.res.setHeader('set-cookie', cookies || [])

  return {
    props: {
      data
    }
  }
}

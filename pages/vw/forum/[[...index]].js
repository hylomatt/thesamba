import Head from 'next/head'
import React from 'react'
import Link from 'next/link'

import { Box, Grid, Typography, Hidden, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { getForums } from '../../../utils/getters'
import Header from '../../../components/Header'
import theme from '../../../utils/theme'

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

        {data.page.forumGroups.map((el, i) => (
          <Box mb={2} key={`forumGroup-${i}`}>
            <Box p={1} bgcolor="secondary.light">
              <Link href={el.href} passHref>
                <Typography component="a" variant="subtitle1">
                  {el.title}
                </Typography>
              </Link>
            </Box>
            {el.items.map((subEl, subI) => (
              <Box py={1} px={1} mb={{ xs: 0, sm: 1 }} borderBottom={1} style={{ borderColor: theme.palette.secondary.light }} key={`forum-${i}-${subI}`}>
                <Grid container>
                  <Grid item xs={12} sm={8}>
                    <Box mb={{ xs: 0, sm: 0 }}>
                      {/* {subEl.newPosts  ? '!' : '-'} */}

                      <Link href={subEl.href} passHref>
                        <Typography component="a" className="font-semibold">
                          {subEl.title}
                        </Typography>
                      </Link>
                      <Hidden xsDown>
                        <Typography>{subEl.description}</Typography>
                      </Hidden>
                    </Box>
                  </Grid>
                  <Hidden smUp>
                    <Grid item xs={12} container justify="flex-end">
                      <Typography align="right">T: {subEl.topics}</Typography>
                      <Box mx={1} height={16}>
                        <Divider orientation="vertical" />
                      </Box>
                      <Typography align="right">P: {subEl.posts}</Typography>
                      <Grid item xs={12}>
                        <Typography align="right">LP: {subEl.lastPost.text}</Typography>
                      </Grid>
                    </Grid>
                  </Hidden>
                  <Hidden xsDown>
                    <Grid item xs={3} sm={1}>
                      <Box pl={1}>
                        <Typography align="right">{subEl.topics}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={3} sm={1}>
                      <Box pl={1}>
                        <Typography align="right">{subEl.posts}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Box pl={1}>
                        <Typography align="right">{subEl.lastPost.text}</Typography>
                      </Box>
                    </Grid>
                  </Hidden>
                </Grid>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  )
})

export async function getServerSideProps(context) {
  const { data, ...rest } = await getForums(context.req)
  context.res.setHeader('set-cookie', rest.cookies || [])

  return {
    props: {
      data
    }
  }
}

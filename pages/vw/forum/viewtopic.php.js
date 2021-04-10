import Head from 'next/head'
import React from 'react'
import Link from 'next/link'

import { Box, Grid, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { getTopic } from '../../../utils/getters'
import Header from '../../../components/Header'

export default withStyles({
  root: {
    color: 'white'
  }
})(({ data, classes }) => {
  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Box mb={2}>
          <Typography variant="h4">{data.topic.title}</Typography>
        </Box>
        <Box mb={2}>
          {data.topic.nav.map((el, i) => (
            <Link href={el.href} key={`topic-nav-${i}`} passHref>
              <Typography component="a">{el.title}</Typography>
            </Link>
          ))}
        </Box>

        <Box py={1} mb={2} bgcolor="primary.main">
          <Grid container>
            <Grid item xs={2}>
              <Typography align="center" className={classes.root}>
                Author
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography align="center" className={classes.root}>
                Message
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {data.topic.posts.map((el, i) => (
          <Box mb={2} key={`topic-post-${i}`}>
            <Grid container>
              <Grid item xs={2}>
                <Box p={1} bgcolor="secondary.light">
                  <Link href={el.name.href || ''} passHref>
                    <Typography component="a">{el.name.title}</Typography>
                  </Link>
                  <Box dangerouslySetInnerHTML={{ __html: el.posterDetails }}></Box>
                </Box>
              </Grid>
              <Grid item xs={10}>
                <Box pl={2}>
                  <Box mb={1} p={1} bgcolor="secondary.light">
                    <Typography component="div" dangerouslySetInnerHTML={{ __html: el.postDetails }} />
                  </Box>
                  <Box p={1}>
                    <Typography component="div" dangerouslySetInnerHTML={{ __html: el.content }} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  )
})

export async function getServerSideProps(context) {
  const { data, ...rest } = await getTopic(context.req)
  context.res.setHeader('set-cookie', rest.cookies || [])

  return {
    props: {
      data
    }
  }
}

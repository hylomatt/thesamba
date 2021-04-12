import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { Box, Typography, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { getHome } from '../../utils/getters'
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

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        {/* scams */}
        <Box mb={1} border={1} borderColor="secondary.light">
          <Box bgcolor="secondary.light" p={1}>
            <Typography>Scam warnings</Typography>
          </Box>
          <Box p={1}>
            {data.scams.map((el, i) => (
              <Box key={`scam-warning-${i}`}>
                <Link href={el.href} passHref>
                  <Typography component="a">{el.title}</Typography>
                </Link>
              </Box>
            ))}
          </Box>
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            {/* classifieds */}
            <Box mb={1} border={1} borderColor="secondary.light">
              <Box bgcolor="secondary.light" p={1}>
                <Typography>Classifieds</Typography>
              </Box>
              <Box p={1}>
                <Link href={data.classifieds.href}>
                  <a>
                    <div style={{ position: 'relative', width: '100%', height: '100px', paddingBottom: '20%' }}>
                      <Image src={data.classifieds.img.src} alt={data.classifieds.img.alt} layout="fill" objectFit="contain" />
                    </div>
                  </a>
                </Link>
                <Box pt={1}>
                  <Typography align="center">{data.classifieds.title}</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            {/* gallery */}
            <Box mb={1} border={1} borderColor="secondary.light">
              <Box bgcolor="secondary.light" p={1}>
                <Typography>Gallery</Typography>
              </Box>
              <Box p={1}>
                <Link href={data.gallery.href}>
                  <a>
                    <div style={{ position: 'relative', width: '100%', height: '100px', paddingBottom: '20%' }}>
                      <Image src={data.gallery.img.src} alt={data.gallery.img.alt} layout="fill" objectFit="contain" />
                    </div>
                  </a>
                </Link>
                <Box pt={1}>
                  <Typography align="center">{data.gallery.title}</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* fact */}
        <Box mb={1} p={1} border={1} borderColor="secondary.light">
          <Box mb={2}>
            <Link href={data.fact.href}>
              <a>
                <Box position="relative" width="100%" height="80px" style={{ paddingBottom: '20%' }}>
                  <Image src={data.fact.img.src} alt={data.fact.img.alt} layout="fill" objectFit="contain" />
                </Box>
              </a>
            </Link>
          </Box>
          <Typography component="div" dangerouslySetInnerHTML={{ __html: data.fact.content }} />
        </Box>

        {/* featured ads */}
        <Box mb={1} border={1} borderColor="secondary.light">
          <Box bgcolor="secondary.light" p={1}>
            <Typography>Featured Ads</Typography>
          </Box>
          <Box p={1}></Box>
        </Box>

        {/* advertisement */}
        <Box mb={1} border={1} borderColor="secondary.light">
          <Box bgcolor="secondary.light" p={1}>
            <Typography>Advertisement</Typography>
          </Box>
          <Box p={1}></Box>
        </Box>

        {/* stolen */}
        {data.stolen.href && (
          <Box mb={1} border={1} borderColor="secondary.light">
            <Box bgcolor="secondary.light" p={1}>
              <Typography>Stolen</Typography>
            </Box>
            <Box p={1}>
              <Link href={data.stolen.href}>
                <a style={{ display: 'block' }}>
                  <div style={{ position: 'relative', width: '100%', height: '100px', paddingBottom: '20%' }}>
                    <Image src={data.stolen.img.src} alt={data.stolen.img.alt} layout="fill" objectFit="contain" />
                  </div>
                </a>
              </Link>
              <Box pt={1}>
                <Typography align="center">{data.stolen.title}</Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* upcoming events */}
        <Box mb={1} border={1} borderColor="secondary.light">
          <Box bgcolor="secondary.light" p={1}>
            <Typography>Coming Events</Typography>
          </Box>
          <Box p={1} className={classes.events} dangerouslySetInnerHTML={{ __html: data.comingEvents }} />
        </Box>
      </Box>
    </Box>
  )
})

export async function getServerSideProps(context) {
  const { data, ...rest } = await getHome(context.req)
  context.res.setHeader('set-cookie', rest.cookies || [])

  return {
    props: {
      data
    }
  }
}

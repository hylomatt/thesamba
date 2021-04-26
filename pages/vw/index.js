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
        <title>{data.base.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        {/* scams */}
        <Box mb={1} border={1} borderColor="secondary.light">
          <Box bgcolor="secondary.light" p={1}>
            <Typography>Scam warnings</Typography>
          </Box>
          <Box p={1}>
            {data.page.scams.map((el, i) => (
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
                <Link href={data.page.classifieds.href}>
                  <a>
                    <div style={{ position: 'relative', width: '100%', height: '100px', paddingBottom: '20%' }}>
                      <Image src={data.page.classifieds.img.src} alt={data.page.classifieds.img.alt} layout="fill" objectFit="contain" />
                    </div>
                  </a>
                </Link>
                <Box pt={1}>
                  <Typography align="center">{data.page.classifieds.title}</Typography>
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
                <Link href={data.page.gallery.href}>
                  <a>
                    <div style={{ position: 'relative', width: '100%', height: '100px', paddingBottom: '20%' }}>
                      <Image src={data.page.gallery.img.src} alt={data.page.gallery.img.alt} layout="fill" objectFit="contain" />
                    </div>
                  </a>
                </Link>
                <Box pt={1}>
                  <Typography align="center">{data.page.gallery.title}</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* fact */}
        <Box mb={1} p={1} border={1} borderColor="secondary.light">
          <Box mb={2}>
            <Link href={data.page.fact.href}>
              <a>
                <Box position="relative" width="100%" height="80px" style={{ paddingBottom: '20%' }}>
                  <Image src={data.page.fact.img.src} alt={data.page.fact.img.alt} layout="fill" objectFit="contain" />
                </Box>
              </a>
            </Link>
          </Box>
          <Typography component="div" dangerouslySetInnerHTML={{ __html: data.page.fact.content }} />
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
        {data.page.stolen.href && (
          <Box mb={1} border={1} borderColor="secondary.light">
            <Box bgcolor="secondary.light" p={1}>
              <Typography>Stolen</Typography>
            </Box>
            <Box p={1}>
              <Link href={data.page.stolen.href}>
                <a style={{ display: 'block' }}>
                  <div style={{ position: 'relative', width: '100%', height: '100px', paddingBottom: '20%' }}>
                    <Image src={data.page.stolen.img.src} alt={data.page.stolen.img.alt} layout="fill" objectFit="contain" />
                  </div>
                </a>
              </Link>
              <Box pt={1}>
                <Typography align="center">{data.page.stolen.title}</Typography>
              </Box>
            </Box>
          </Box>
        )}

        {/* upcoming events */}
        <Box mb={1} border={1} borderColor="secondary.light">
          <Box bgcolor="secondary.light" p={1}>
            <Typography>Coming Events</Typography>
          </Box>
          <Box p={1} className={classes.events} dangerouslySetInnerHTML={{ __html: data.page.comingEvents }} />
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

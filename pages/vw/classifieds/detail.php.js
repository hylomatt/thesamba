import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { Box, Typography, Paper, Button, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Carousel from 'react-material-ui-carousel'

import { getClassifiedDetail } from '../../../utils/getters'
import Header from '../../../components/Header'
import theme from '../../../utils/theme'

export default withStyles({
  imageContainer: {
    width: '100%',
    maxWidth: '480px',
    height: 'auto',
    margin: '0 auto',
    '& > div': {
      position: 'unset !important',
      height: 'auto'
    }
  },
  image: {
    objectFit: 'contain',
    width: '100% !important',
    position: 'relative !important',
    height: 'unset !important'
  }
})(({ classes, data }) => {
  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Box mb={2}>
          <Typography variant="h4">{data.detail.title}</Typography>
        </Box>
        <Box mb={2}>
          {data.detail.nav.map((el, i) => {
            if (el.href) {
              return (
                <Link href={el.href} key={`topic-nav-${i}`} passHref>
                  <Typography component="a">{el.title}</Typography>
                </Link>
              )
            }
            return (
              <Typography component="span" key={`topic-nav-${i}`}>
                {el.title}
              </Typography>
            )
          })}
        </Box>
        <Box mb={2}>
          <Carousel
            autoPlay={false}
            interval="7000"
            indicatorIconButtonProps={{
              style: {
                padding: '0 10px 10px',
                color: theme.palette.secondary.main
              }
            }}
            activeIndicatorIconButtonProps={{
              style: {
                color: theme.palette.primary.main
              }
            }}
            indicatorContainerProps={{
              style: {
                marginTop: '10px' // 5
              }
            }}
          >
            {data.detail.thumbnails.map((item, i) => (
              <Image src={item.src.replace('thumbnails/', '')} alt={item.alt} width={640} height={480} layout="responsive" key={`detail-image-${data.detail.adId}-${i}`} />
            ))}
          </Carousel>
        </Box>
        <Box mb={2}>
          <Typography component="div" dangerouslySetInnerHTML={{ __html: data.detail.description }} />
        </Box>
        <Box mb={1} border={1} borderColor="secondary.light">
          <Box bgcolor="secondary.light" p={1}>
            <Typography>Advertiser Information</Typography>
          </Box>
          <Box p={1}>
            <Grid container>
              <Grid item xs={5}>
                <Box pr={1} align="right">
                  <Typography>Advertiser:</Typography>
                  <Typography>Member since:</Typography>
                </Box>
              </Grid>
              <Grid item xs={7}>
                <Link href={data.detail.advertiserInfo.href} passHref>
                  <Typography component="a">{data.detail.advertiserInfo.title}</Typography>
                </Link>
                <Typography>{data.detail.advertiserInfo.memberSince}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box mb={1} border={1} borderColor="secondary.light">
          <Box bgcolor="secondary.light" p={1}>
            <Typography>Ad Information</Typography>
          </Box>
          <Box p={1}>
            <Grid container>
              <Grid item xs={5}>
                <Box pr={1}>
                  <Typography component="div" align="right" dangerouslySetInnerHTML={{ __html: data.detail.adInfo.titles }} />
                </Box>
              </Grid>
              <Grid item xs={7}>
                <Typography component="div" dangerouslySetInnerHTML={{ __html: data.detail.adInfo.values }} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  )
})

export async function getServerSideProps(context) {
  const { data, ...rest } = await getClassifiedDetail(context.req)
  context.res.setHeader('set-cookie', rest.cookies || [])

  return {
    props: {
      data
    }
  }
}

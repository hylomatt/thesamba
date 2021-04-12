import React, { useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Slider from 'react-slick'

import { Box, Typography, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { getClassifiedDetail } from '../../../utils/getters'
import Header from '../../../components/Header'

export default withStyles({})(({ classes, data }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  }

  const sliderRef = useRef()

  const gotoNext = () => {
    sliderRef.current.slickNext()
  }

  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.title}</title>
        <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
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
        <Box mb={4}>
          <Slider {...sliderSettings} ref={sliderRef}>
            {!data.detail.thumbnails.length && (
              <Box onClick={gotoNext}>
                <img src={data.detail.mainPhoto.src} alt={data.detail.mainPhoto.alt} width="100%" />
              </Box>
            )}
            {data.detail.thumbnails.map((item, i) => (
              <Box key={`detail-image-${data.detail.adId}-${i}`} onClick={gotoNext}>
                <img src={item.src.replace('thumbnails/', '')} alt={item.alt} width="100%" />
                {item.label && (
                  <Typography variant="body2" align="center">
                    {item.label}
                  </Typography>
                )}
              </Box>
            ))}
          </Slider>
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

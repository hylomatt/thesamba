import React, { useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Slider from 'react-slick'

import { Box, Typography, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { getClassifiedDetail } from '../../../utils/getters'
import Header from '../../../components/Header'

export default withStyles({
  slider: {
    '& .slick-dots': {
      position: 'static'
    }
  },
  slideText: {
    margin: '8px 0'
  }
})(({ classes, data }) => {
  console.log(data)

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
        <title>{data.base.title}</title>
        <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Box mb={2}>
          <Typography variant="h4">{data.page.title}</Typography>
        </Box>
        <Box mb={2}>
          {data.page.nav.map((el, i) => {
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
          <Slider {...sliderSettings} ref={sliderRef} className={classes.slider}>
            {!data.page.thumbnails.length && (
              <Box onClick={gotoNext}>
                <img src={data.page.mainPhoto.src} alt={data.page.mainPhoto.alt} width="100%" />
              </Box>
            )}
            {data.page.thumbnails.map((item, i) => (
              <Box key={`detail-image-${data.page.adId}-${i}`} onClick={gotoNext}>
                <img src={item.src.replace('thumbnails/', '')} alt={item.alt} width="100%" />
                {item.label && (
                  <Typography variant="body2" align="center" className={classes.slideText}>
                    {item.label}
                  </Typography>
                )}
              </Box>
            ))}
          </Slider>
        </Box>
        <Box mb={2}>
          <Typography component="div" dangerouslySetInnerHTML={{ __html: data.page.description }} />
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
                <Link href={data.page.advertiserInfo.href} passHref>
                  <Typography component="a">{data.page.advertiserInfo.title}</Typography>
                </Link>
                <Typography>{data.page.advertiserInfo.memberSince}</Typography>
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
                  <Typography component="div" align="right" dangerouslySetInnerHTML={{ __html: data.page.adInfo.titles }} />
                </Box>
              </Grid>
              <Grid item xs={7}>
                <Typography component="div" dangerouslySetInnerHTML={{ __html: data.page.adInfo.values }} />
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

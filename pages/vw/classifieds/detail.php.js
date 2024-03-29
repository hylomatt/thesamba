/* eslint-disable react/no-unknown-property */

import React, { useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Slider from 'react-slick'

import { Box, Typography, Grid, Button, Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { getClassifiedDetail } from '../../../utils/getters'
import Header from '../../../components/Header'
import Breadcrumb from '../../../components/Breadcrumb'

export default withStyles({
  slider: {
    '& .slick-dots': {
      position: 'static'
    }
  },
  slideText: {
    margin: '8px 0'
  },
  slideBox: {
    outline: 'none',
    '&:focus': {
      outline: 'none'
    }
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
          <Typography variant="h6">Price: {data.page.price}</Typography>
        </Box>
        <Box mb={2}>
          <Breadcrumb crumbs={data.page.nav} />
        </Box>
        <Box mb={2}>
          {data.page.mainPhoto.src
            ? (
              <Slider {...sliderSettings} ref={sliderRef} className={classes.slider}>
                {!data.page.thumbnails.length && (
                  <Box onClick={gotoNext} className={classes.slideBox}>
                    <Image src={data.page.mainPhoto.src} alt={data.page.mainPhoto.alt} width="100%" />
                  </Box>
                )}
                {data.page.thumbnails.map((item, i) => (
                  <Box key={`detail-image-${data.page.adId}-${i}`} onClick={gotoNext} className={classes.slideBox}>
                    <Image src={item.src.replace('thumbnails/', '')} alt={item.alt} width="100%" />
                    {item.label && (
                      <Typography variant="body2" align="center" className={classes.slideText}>
                        {item.label}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Slider>
            )
            : (
              <Divider />
            )}
        </Box>
        <Box mb={2}>
          <Typography component="div" dangerouslySetInnerHTML={{ __html: data.page.description }} />
        </Box>
        <Box mb={1} border={1} borderColor="secondary.light">
          <Box bgcolor="secondary.light" p={1}>
            <Typography>Advertiser Information</Typography>
          </Box>
          <Box p={1}>
            <Grid container alignItems="center">
              <Grid item xs={4}>
                <Box pr={1}>
                  {data.page.advertiserInfo.labels.map((label, i) => (
                    <Typography key={`advertiserInfo-label-${data.page.adId}-${i}`}>{label}</Typography>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Link href={data.page.advertiserInfo.memberHref} passHref>
                  <Typography component="a">{data.page.advertiserInfo.member}</Typography>
                </Link>
                {data.page.advertiserInfo.textValues.map((value, i) => (
                  <Typography key={`advertiserInfo-textValue-${data.page.adId}-${i}`}>{value}</Typography>
                ))}
              </Grid>
              {data.page.advertiserInfo.contactPhone && (
                <Grid item>
                  <Box mt={2} pr={2}>
                    <Button variant="outlined" component="a" href={`tel:${data.page.advertiserInfo.contactPhone}`}>
                      Call
                    </Button>
                  </Box>
                </Grid>
              )}
              {data.page.advertiserInfo.contactEmail && (
                <Grid item>
                  <Box mt={2}>
                    <Link href={data.page.advertiserInfo.contactEmail} passHref>
                      <Button variant="outlined" component="a">
                        Email
                      </Button>
                    </Link>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
        <Box mb={1} border={1} borderColor="secondary.light">
          <Box bgcolor="secondary.light" p={1}>
            <Typography>Ad Information</Typography>
          </Box>
          <Box p={1}>
            {data.page.adInfo.map((el, i) => (
              <Grid container key={`detail-ad-info-${data.page.adId}-${i}`}>
                <Grid item xs={12} sm={3} md={2}>
                  <Box pr={1}>
                    <Typography component="div" dangerouslySetInnerHTML={{ __html: el[0] }} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={9} md={10}>
                  <Box pl={2} pb={[1, 0]}>
                    <Typography component="div" dangerouslySetInnerHTML={{ __html: el[1] }} />
                  </Box>
                </Grid>
              </Grid>
            ))}
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

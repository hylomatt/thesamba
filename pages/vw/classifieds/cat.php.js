import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { Box, Typography, Grid, Hidden } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { getClassifiedCategory } from '../../../utils/getters'
import HeaderTop from '../../../components/HeaderTop'
import Header from '../../../components/Header'

import constants from '../../../utils/constants'

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white'
  },
  list: {
    width: 250
  },

  accRoot: {
    width: '100%'
  },
  heading: {
    display: 'block',
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0
  },

  popper: {
    minWidth: 200
  },

  menuItem: {
    justifyContent: 'center'
  },

  menuBtn: {
    height: 64
  },

  classifiedImage: {
    display: 'block',
    margin: '0 auto',
    maxWidth: '100%',
    maxHeight: '120px'
  }
}))

export default function ClassifiedCategory({ data }) {
  console.log(data)
  const classes = useStyles()

  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.title}</title>
      </Head>

      <HeaderTop data={data.preHeader} loggedIn={data.loggedIn} />
      <Header data={data.header} items={data.nav} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Box mb={2}>
          <Typography variant="h4">{data.category.title}</Typography>
        </Box>
        <Box mb={2}>
          {data.category.nav.map((el, i) => {
            if (el.href) {
              return (
                <Link href={el.href} key={`topic-nav-${i}`} passHref>
                  <Typography component="a">{el.title}</Typography>
                </Link>
              )
            }
            return (
              <Typography component="a" key={`topic-nav-${i}`}>
                {el.title}
              </Typography>
            )
          })}
        </Box>

        <Hidden smDown>
          <Box bgcolor="primary.main">
            <Grid container>
              <Grid item xs={2}>
                <Box p={1} px={2}>
                  <Typography align="center" className={classes.root}>
                    Picture
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={5}>
                <Box p={1} px={2}>
                  <Typography className={classes.root}>Description</Typography>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box p={1} px={2}>
                  <Typography align="center" className={classes.root}>
                    Price
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box p={1} px={2}>
                  <Typography align="center" className={classes.root}>
                    Date/Location
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Hidden>

        {data.category.ads.map((el, i) => (
          <Box bgcolor={i % 2 ? 'white' : 'secondary.light'} key={`classifies-ad-${i}`}>
            <Grid container>
              <Grid item xs={6} sm={4} md={2}>
                <Box p={1}>
                  <Link href={el.href} passHref>
                    <a>
                      <div style={{ position: 'relative', width: '100%', height: '120px', paddingBottom: '20%' }}>
                        <Image src={el.img.src} alt={el.img.alt} layout="fill" objectFit="contain" />
                      </div>
                      {/* <img src={el.img.src} className={classes.classifiedImage} /> */}
                    </a>
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={4} sm={6} md={5}>
                <Box p={1} px={1}>
                  <Link href={el.href} passHref>
                    <Typography component="a">{el.title}</Typography>
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box p={1} px={{ xs: 1, md: 2 }}>
                  <Typography align="center">{el.price}</Typography>
                </Box>
              </Grid>
              <Hidden smDown>
                <Grid item xs={3}>
                  <Box p={1} px={2} align="right">
                    <Typography display="block">{el.date}</Typography>
                    <Typography display="block">{el.location}</Typography>
                    <Link href={el.seller.href} passHref>
                      <Typography component="a">{el.seller.title}</Typography>
                    </Link>
                  </Box>
                </Grid>
              </Hidden>
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const { cookies, data } = await getClassifiedCategory(context.req)
  context.res.setHeader('set-cookie', cookies || [])

  return {
    props: {
      data
    }
  }
}

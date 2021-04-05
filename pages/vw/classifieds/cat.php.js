import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { Box, Typography, Grid, Hidden } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { withStyles } from '@material-ui/core/styles'

import { getClassifiedCategory } from '../../../utils/getters'
import HeaderTop from '../../../components/HeaderTop'
import Header from '../../../components/Header'

// const formatter = new Intl.NumberFormat('en-US', {
//   style: 'currency',
//   currency: 'USD'

//   // These options are needed to round to whole numbers if that's what you want.
//   //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
//   //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
// })
// {!isNaN(el.price) ? formatter.format(el.price.replace(/\$|,/g, '')) : el.price}

export default withStyles((theme) => ({
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
}))(function ClassifiedCategory({ data }) {
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
                <Box p={1} height="100%">
                  <Link href={el.href} passHref>
                    <a style={{ display: 'block', height: '100%' }}>
                      {!el.img.src.includes('blank.gif')
                        ? (
                          <div style={{ position: 'relative', width: '100%', height: '120px', paddingBottom: '20%' }}>
                            <Image src={el.img.src} alt={el.img.alt} layout="fill" objectFit="cover" />
                          </div>
                        )
                        : (
                          <Skeleton variant="rect" height="100%" animation="wave" />
                        )}
                    </a>
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={5} container direction="column">
                <Grid item style={{ flex: 'auto' }}>
                  <Box p={1} px={1}>
                    <Link href={el.href} passHref>
                      <Typography component="a">{el.title}</Typography>
                    </Link>
                  </Box>
                </Grid>
                <Grid item>
                  <Box p={1} px={1}>
                    <Typography align="right">{el.price}</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Hidden smDown>
                <Grid item xs={6} sm={6} md={5}>
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
})

export async function getServerSideProps(context) {
  const { cookies, data } = await getClassifiedCategory(context.req)
  context.res.setHeader('set-cookie', cookies || [])

  return {
    props: {
      data
    }
  }
}

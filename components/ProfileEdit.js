import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { Box, Typography, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

import Header from './Header'

const useStyles = makeStyles({
  root: {
    color: 'white'
  }
})

export default function ProfileEdit({ data }) {
  const classes = useStyles()

  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.base.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Box mb={1} border={1} borderColor="primary.main">
          <Box bgcolor="primary.main" p={1}>
            <Typography align="center" className={classes.root}>
              {data.page.title}
            </Typography>
          </Box>
        </Box>

        <Box mb={1} border={1} borderColor="secondary.main">
          <Box bgcolor="secondary.main" p={1}>
            <Typography align="center">Avatar</Typography>
          </Box>
          <Box p={1} align="center">
            {data.page.avatar.img.src
              ? (
                <div style={{ position: 'relative', width: '100%', height: '66px', paddingBottom: '20%' }}>
                  <Image src={data.page.avatar.img.src} alt={data.page.avatar.img.alt} layout="fill" objectFit="contain" />
                </div>
              )
              : (
                <Skeleton variant="rect" height="66px" width="100px" animation="wave" />
              )}
          </Box>
        </Box>

        <Box mb={1} border={1} borderColor="secondary.main">
          <Box bgcolor="secondary.main" p={1}>
            <Typography align="center">All about...</Typography>
          </Box>
          <Box p={1}>
            <Grid container>
              {data.page.info.map((el, i) => (
                <React.Fragment key={`profile-contact-${data.page.title}-${i}`}>
                  <Grid item xs={6}>
                    <Typography>{el[0]}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component="div" dangerouslySetInnerHTML={{ __html: el[1] }} />
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Box>
        </Box>

        <Box mb={1} border={1} borderColor="secondary.main">
          <Box bgcolor="secondary.main" p={1}>
            <Typography align="center">Contact</Typography>
          </Box>
          <Box p={1}>
            <Grid container>
              {data.page.contact.map((el, i) => (
                <React.Fragment key={`profile-contact-${data.page.title}-${i}`}>
                  <Grid item xs={6}>
                    <Typography>{el[0]}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component="div" dangerouslySetInnerHTML={{ __html: el[1] }} />
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Box>
        </Box>

        <Box mb={1} border={1} borderColor="secondary.main">
          <Box bgcolor="secondary.main" p={1}>
            <Typography align="center">Signature</Typography>
          </Box>
          <Box p={1}>
            <Typography component="div" dangerouslySetInnerHTML={{ __html: data.page.signature }} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

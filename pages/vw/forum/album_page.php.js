import React from 'react'
import Head from 'next/head'
// import Link from 'next/link'
import Image from 'next/image'
import copy from 'copy-to-clipboard'

import { Box, Typography, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { getGalleryPage } from '../../../utils/getters'
import Header from '../../../components/Header'
import Breadcrumb from '../../../components/Breadcrumb'

export default withStyles({
  root: {
    color: 'white'
  },
  topLinkSpacing: {
    marginTop: '8px',
    padding: '8px 0'
  },
  image: {
    width: 'auto',
    maxWidth: '100%',
    height: 'auto'
  }
})(({ data, classes }) => {
  const handleCopy = (e) => {
    copy(e.target.dataset.copy, {
      debug: true,
      message: 'Press #{key} to copy'
    })
  }

  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.base.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Box mb={2}>
          <Breadcrumb crumbs={data.page.nav} />
        </Box>

        <Box bgcolor="primary.main">
          <Box p={1} px={2}>
            <Typography align="center" className={classes.root}>
              {data.page.title}
            </Typography>
          </Box>
        </Box>

        <Box mb={2}>
          <Grid container>
            <Grid item xs={6} sm={4} md={2}>
              <Typography align="center" data-copy={data.page.photoLink} onClick={handleCopy} className={classes.topLinkSpacing}>
                Copy photo link
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography align="center" data-copy={data.page.forumCode} onClick={handleCopy} className={classes.topLinkSpacing}>
                Copy forum link
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box p={1}>
                {/* <Link href={data.page.href} passHref>
                  <a style={{ display: 'block' }}> */}
                <Image src={data.page.img.src} alt={data.page.img.alt} className={classes.image} />
                {/* <div style={{ position: 'relative', width: '100%', height: '400px', paddingBottom: '20%' }}>
                  <Image src={data.page.img.src} alt={data.page.img.alt} layout="fill" objectFit="cover" />
                </div> */}
                {/* </a>
                </Link> */}
              </Box>
              <Box p={1}>
                <Typography>{data.page.photo.title}</Typography>
                <Typography component="div" dangerouslySetInnerHTML={{ __html: data.page.photo.description }} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mt={2} border={1} borderColor="secondary.main">
                <Box bgcolor="secondary.main" p={1}>
                  <Typography align="center">Author</Typography>
                </Box>
                <Box p={1}>
                  <Typography>
                    <strong>{data.page.author.name}</strong>
                  </Typography>
                  <Typography component="div" dangerouslySetInnerHTML={{ __html: data.page.author.info }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
})

export async function getServerSideProps(context) {
  const { data, ...rest } = await getGalleryPage(context.req)
  context.res.setHeader('set-cookie', rest.cookies || [])

  return {
    props: {
      data
    }
  }
}

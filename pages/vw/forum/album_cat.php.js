import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import copy from 'copy-to-clipboard'

import { Box, Typography, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { getGalleryCategory } from '../../../utils/getters'
import Header from '../../../components/Header'
import Breadcrumb from '../../../components/Breadcrumb'

export default withStyles({
  root: {
    color: 'white'
  },
  itemContent: {
    wordBreak: 'break-word'
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
          <Typography variant="h4">{data.page.title}</Typography>
        </Box>
        <Box mb={2}>
          <Breadcrumb crumbs={data.page.nav} />
        </Box>

        <Box bgcolor="primary.main">
          <Box p={1} px={2}>
            <Typography align="center" className={classes.root}>
              Category :: {data.page.title}
            </Typography>
          </Box>
        </Box>

        {data.page.entries.map((el, i) => (
          <Box bgcolor={i % 2 ? 'white' : 'secondary.light'} key={`classifies-ad-${i}`}>
            <Grid container>
              <Grid item xs={6} sm={4} md={2}>
                <Box p={1} height="100%">
                  <Link href={el.href} passHref>
                    <a style={{ display: 'block' }}>
                      <div style={{ position: 'relative', width: '100%', height: '120px', paddingBottom: '20%' }}>
                        <Image src={el.img.src} alt={el.img.alt} layout="fill" objectFit="cover" />
                      </div>
                    </a>
                  </Link>
                  <Box mt={1}>
                    {el.imgInfo.map((infoLine, ii) => (
                      <Typography key={`imginfo-${ii}`} variant="body2" className={classes.itemContent}>
                        {infoLine}
                      </Typography>
                    ))}
                    {/* <Typography dangerouslySetInnerHTML={{ __html: el.imgInfo }} className={classes.itemContent} /> */}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} sm={6} md={5} container direction="column">
                <Box p={1} px={1}>
                  <Typography component="div" dangerouslySetInnerHTML={{ __html: el.info }} className={classes.itemContent} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={5}>
                <Box p={1} px={1} align="right">
                  <Typography data-copy={el.forumCode} onClick={handleCopy}>
                    Copy Forum Code
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  )
})

export async function getServerSideProps(context) {
  const { data, ...rest } = await getGalleryCategory(context.req)
  context.res.setHeader('set-cookie', rest.cookies || [])

  return {
    props: {
      data
    }
  }
}

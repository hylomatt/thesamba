import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { getHome } from '../../utils/api'
import HeaderTop from '../../components/HeaderTop'
import Header from '../../components/Header'

import constants from '../../utils/constants'

const useStyles = makeStyles((theme) => ({
  events: {
    '& > div': {
      marginBottom: '8px',
      fontSize: 13
    }
  }
}))

export default function Home({ data }) {
  console.log('=== home:', data)
  const classes = useStyles()

  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.title}</title>
      </Head>

      <HeaderTop data={data.preHeader} loggedIn={data.loggedIn} />
      <Header data={data.header} items={data.nav} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Box mb={1} border={1} borderColor="secondary.light">
          <Box bgcolor="secondary.light" p={1}>
            <Typography>Scam warnings</Typography>
          </Box>
          <Box p={1}>
            {data.scams.map((el, i) => (
              <Box key={`scam-warning-${i}`}>
                <Link href={el.href} passHref>
                  <Typography component="a">{el.title}</Typography>
                </Link>
              </Box>
            ))}
          </Box>
        </Box>

        <Box mb={1} border={1} borderColor="secondary.light">
          <Box bgcolor="secondary.light" p={1}>
            <Typography>Classifieds</Typography>
          </Box>
          <Box p={1}>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '20%' }}>
              <Image src={`${constants.baseUrl}${data.classifieds.img.src}`} alt={data.classifieds.img.alt} layout="fill" objectFit="contain" />
            </div>
            <Typography>{data.classifieds.title}</Typography>
          </Box>
        </Box>

        <Box mb={1} border={1} borderColor="secondary.light">
          <Box bgcolor="secondary.light" p={1}>
            <Typography>Gallery</Typography>
          </Box>
          <Box p={1}>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '20%' }}>
              <Image src={`${constants.baseUrl}${data.gallery.img.src}`} alt={data.gallery.img.alt} layout="fill" objectFit="contain" />
            </div>
            <Typography>{data.gallery.title}</Typography>
          </Box>
        </Box>

        <Box mb={1} p={1} border={1} borderColor="secondary.light">
          <div style={{ position: 'relative', width: '100%', paddingBottom: '20%' }}>
            <Image src={`${constants.baseUrl}${data.fact.img.src}`} alt={data.fact.img.alt} layout="fill" objectFit="contain" />
          </div>
          <Typography dangerouslySetInnerHTML={{ __html: data.fact.content }} />
        </Box>

        <Box mb={1} border={1} borderColor="secondary.light">
          <Box bgcolor="secondary.light" p={1}>
            <Typography>Featured Ads</Typography>
          </Box>
          <Box p={1}></Box>
        </Box>

        <Box mb={1} border={1} borderColor="secondary.light">
          <Box bgcolor="secondary.light" p={1}>
            <Typography>Advertisement</Typography>
          </Box>
          <Box p={1}></Box>
        </Box>

        {data.stolen.href && (
          <Box mb={1} border={1} borderColor="secondary.light">
            <Box bgcolor="secondary.light" p={1}>
              <Typography>Stolen</Typography>
            </Box>
            <Box p={1}>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '20%' }}>
                <Image src={`${constants.baseUrl}${data.stolen.img.src}`} alt={data.stolen.img.alt} layout="fill" objectFit="contain" />
              </div>
              <Typography>{data.stolen.title}</Typography>
            </Box>
          </Box>
        )}

        <Box mb={1} border={1} borderColor="secondary.light">
          <Box bgcolor="secondary.light" p={1}>
            <Typography>Coming Events</Typography>
          </Box>
          <Box p={1} className={classes.events} dangerouslySetInnerHTML={{ __html: data.comingEvents }} />
        </Box>
      </Box>
    </Box>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      data: await getHome(context.req.url)
    }
  }
}

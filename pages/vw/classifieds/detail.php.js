import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { Box, Typography } from '@material-ui/core'

import { getClassifiedDetail } from '../../../utils/getters'
import HeaderTop from '../../../components/HeaderTop'
import Header from '../../../components/Header'

export default function ClassifiedDetail({ data }) {
  console.log(data)

  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.title}</title>
      </Head>

      <HeaderTop data={data.preHeader} loggedIn={data.loggedIn} />
      <Header data={data.header} items={data.nav} selected="Home" />

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
              <Typography component="a" key={`topic-nav-${i}`}>
                {el.title}
              </Typography>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const { cookies, data } = await getClassifiedDetail(context.req)
  context.res.setHeader('set-cookie', cookies || [])

  return {
    props: {
      data
    }
  }
}

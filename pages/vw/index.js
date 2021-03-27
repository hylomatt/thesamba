import React from 'react'
import Head from 'next/head'

import { getHome } from '../../utils/api'
import HeaderTop from '../../components/HeaderTop'
import Header from '../../components/Header'
import HeaderNav from '../../components/HeaderNav'

export default function Home ({ data }) {
  return (
    <div className="none:container mx-auto">
      <Head>
        <title>{data.title}</title>
      </Head>

      <HeaderTop data={data.preHeader} loggedIn={data.loggedIn} />
      <Header data={data.header} />
      <HeaderNav items={data.nav} selected="Home" />

      <main className="main p-4">
        <p>home</p>
      </main>

      <footer className=""></footer>
    </div>
  )
}

export async function getServerSideProps (context) {
  console.log('=== home:', context.req.url)
  return {
    props: {
      data: await getHome(context.req.url)
    }
  }
}

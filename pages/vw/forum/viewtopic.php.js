import Head from 'next/head'
import React from 'react'
import Link from 'next/link'

import { getTopic } from '../../../utils/api'
import HeaderTop from '../../../components/HeaderTop'
import Header from '../../../components/Header'
import HeaderNav from '../../../components/HeaderNav'
import Box from '../../../components/Box'

export default function TopicDetail({ data }) {
  console.log(data)

  return (
    <div className="none:container mx-auto">
      <Head>
        <title>{data.title}</title>
      </Head>

      <HeaderTop data={data.preHeader} loggedIn={data.loggedIn} />
      <Header data={data.header} />
      <HeaderNav items={data.nav} selected="Forums" />

      <main className="main p-4">
        <Box>{data.title}</Box>
        <Box classes="py-2 grid w-full bg-medium-blue text-white" styles={{ gridTemplateColumns: '150px auto' }}>
          <Box classes="text-center">Author</Box>
          <Box classes="text-center">Message</Box>
        </Box>
        {data.posts.map((el, i) => {
          return (
            <Box classes="mb-4 grid w-full" key={`topic-post-${i}`} styles={{ gridTemplateColumns: '150px auto' }}>
              <Box classes="p-2 bg-light-grey">
                <Link href={el.name.href || ''}>
                  <a>{el.name.title}</a>
                </Link>
                <Box dangerouslySetInnerHTML={{ __html: el.posterDetails }}></Box>
              </Box>
              <Box classes="py-2 px-4">
                <Box dangerouslySetInnerHTML={{ __html: el.postDetails }}></Box>
                <Box dangerouslySetInnerHTML={{ __html: el.content }}></Box>
                {/* <Box>{subEl.newPosts ? '!' : ''}</Box>
                <Box>
                  <Link href={subEl.href || ''}>
                    <a className="font-semibold">{subEl.title}</a>
                  </Link>
                  <p>{subEl.description}</p>
                </Box>
                <Box classes="text-right">{subEl.replies}</Box>
                <Box classes="text-right">{subEl.author.text}</Box>
                <Box classes="text-right">{subEl.views}</Box>
                <Box classes="text-right">{subEl.lastPost.text}</Box> */}
              </Box>
            </Box>
          )
        })}
      </main>

      <footer className=""></footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      data: await getTopic(context.req.url)
    }
  }
}

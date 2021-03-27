import Head from 'next/head'
import React from 'react'
// import Link from 'next/link'

import { getForum } from '../../../utils/api'
import HeaderTop from '../../../components/HeaderTop'
import Header from '../../../components/Header'
import HeaderNav from '../../../components/HeaderNav'
// import Box from '../../../components/Box'

export default function ForumDetail({ data }) {
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
        {/* <Box
          classes="py-2 px-4 grid w-full bg-medium-blue text-white"
          styles={{ gridTemplateColumns: "auto 60px 60px 130px" }}
        >
          <Box>Forum</Box>
          <Box classes="text-right">Topics</Box>
          <Box classes="text-right">Posts</Box>
          <Box classes="text-right">Last Post</Box>
        </Box>
        {data.forumGroups.map((el, i) => (
          <Box classes="mb-4" key={`forumGroup-${i}`}>
            <Box classes="p-2 bg-light-grey">
              <Link href={el.href}>
                <a>{el.title}</a>
              </Link>
            </Box>
            <Box classes="">
              {el.items.map((subEl, subI) => (
                <Box
                  key={`forum-${i}-${subI}`}
                  classes="py-2 px-4 grid w-full"
                  styles={{ gridTemplateColumns: "30px auto 60px 60px 130px" }}
                >
                  <Box>{subEl.newPosts ? "!" : ""}</Box>
                  <Box>
                    <Link href={subEl.href}>
                      <a className="font-semibold">{subEl.title}</a>
                    </Link>
                    <p>{subEl.description}</p>
                  </Box>
                  <Box classes="text-right">{subEl.topics}</Box>
                  <Box classes="text-right">{subEl.posts}</Box>
                  <Box classes="text-right">{subEl.lastPost.text}</Box>
                </Box>
              ))}
            </Box>
          </Box>
        ))} */}
      </main>

      <footer className=""></footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      data: await getForum(context.req.url)
    }
  }
}

import Head from "next/head";
import { useEffect, useState } from "react";

import { getArchives } from "../../../../utils/api";
import HeaderTop from "../../../../components/header-top";
import Header from "../../../../components/header";
import HeaderNav from "../../../../components/header-nav";

export default function TechnicalIndex({ data }) {
  return (
    <div className="none:container mx-auto">
      <Head>
        <title>{data.title}</title>
      </Head>

      <HeaderTop data={data.preHeader} loggedIn={data.loggedIn} />
      <Header data={data.header} />
      <HeaderNav items={data.nav} selected="Archives" />

      <main className="main p-4">
        <p>archives</p>
      </main>

      <footer className=""></footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      data: await getArchives(context.req.url),
    },
  };
}

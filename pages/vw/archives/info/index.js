import Head from "next/head";
import { useEffect, useState } from "react";

import { getTechnical } from "../../../../utils/api";
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
      <HeaderNav items={data.nav} selected="Technical" />

      <main className="main p-4">
        <p>technical</p>
      </main>

      <footer className=""></footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      data: await getTechnical(context.req.url),
    },
  };
}

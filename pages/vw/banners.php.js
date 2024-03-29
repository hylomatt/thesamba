import React from "react";
import Head from "next/head";

import { Box, Typography, Grid } from "@mui/material";

import { getHome } from "../../utils/getters";
import Header from "../../components/Header";

export default function Main({ data }) {
  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.base.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Typography>Banners</Typography>
      </Box>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const { data, ...rest } = await getHome(context.req);
  context.res.setHeader("set-cookie", rest.cookies || []);

  return {
    props: {
      data,
    },
  };
}

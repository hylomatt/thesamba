import Head from "next/head";
import React from "react";

import {
  Box,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Hidden,
} from "@mui/material";

import { getHome } from "../../../utils/getters";
import Header from "../../../components/Header";

export default function Main({ data }) {
  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.base.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Typography>Ad manage</Typography>
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

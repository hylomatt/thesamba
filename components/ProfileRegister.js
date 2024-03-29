import React from "react";
import Head from "next/head";

import { Box, Typography } from "@mui/material";

import Header from "./Header";

export default function ProfileRegister({ data }) {
  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.base.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Box mb={1} border={1} borderColor="primary.main">
          <Box bgcolor="primary.main" p={1}>
            <Typography align="center" sx={{ color: "white" }}>
              {data.page.title}
            </Typography>
          </Box>

          <Box mb={1} p={2}>
            <Typography
              component="div"
              dangerouslySetInnerHTML={{ __html: data.page.content }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

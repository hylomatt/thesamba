import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { Box, Typography, Grid, Hidden } from "@mui/material";
import { styled } from "@mui/system";

import { getGallery } from "../../../utils/getters";
import Header from "../../../components/Header";

const StyledTypography = styled(Typography)({
  color: "white",
});

const StyledCatTitle = styled(Link)({
  display: "block",
  padding: "8px 0",
});

export default function Main({ data }) {
  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.base.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box mb={1} border={1} borderColor="primary.main" align="center">
              <Box bgcolor="primary.main" p={1}>
                <StyledTypography align="center">Latest Entry</StyledTypography>
              </Box>
              <Box p={1}>
                <Link href={data.page.latestEntry.href}>
                  <img
                    src={data.page.latestEntry.img.src}
                    alt={data.page.latestEntry.topictitle}
                  />
                </Link>
                <Typography>{data.page.latestEntry.topictitle}</Typography>
                <Typography
                  component="div"
                  dangerouslySetInnerHTML={{
                    __html: data.page.latestEntry.postbody,
                  }}
                />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box mb={1} border={1} borderColor="primary.main" align="center">
              <Box bgcolor="primary.main" p={1}>
                <StyledTypography align="center">Stolen</StyledTypography>
              </Box>
              <Box p={1}>
                <Link href={data.page.stolen.href}>
                  <img
                    src={data.page.stolen.img.src}
                    alt={data.page.stolen.topictitle}
                  />
                </Link>
                <Typography>{data.page.stolen.topictitle}</Typography>
                <Typography
                  component="div"
                  dangerouslySetInnerHTML={{
                    __html: data.page.stolen.postbody,
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Hidden xsDown>
          <Box bgcolor="primary.main">
            <Grid container>
              <Grid item xs={9}>
                <Box p={1}>
                  <StyledTypography align="center">Category</StyledTypography>
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Box p={1}>
                  <StyledTypography align="right">Pics</StyledTypography>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box p={1}>
                  <StyledTypography align="right">Last Post</StyledTypography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Hidden>

        <Box mb={1} border={1} borderColor="primary.main">
          <Box bgcolor="primary.main" p={1}>
            <Grid container>
              <Grid item xs={10}>
                <StyledTypography>Categories</StyledTypography>
              </Grid>
              <Grid item xs={2}>
                <StyledTypography align="right">Pics</StyledTypography>
              </Grid>
            </Grid>
          </Box>
          <Box p={1} pt={2}>
            {data.page.categories.map((cat, i) => (
              <Box key={`mobile-categories-${i}`}>
                <Grid container alignItems="center">
                  <Grid item xs={10}>
                    <StyledCatTitle href={cat.href}>{cat.title}</StyledCatTitle>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography align="right">{cat.pics}</Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const { data, ...rest } = await getGallery(context.req);
  context.res.setHeader("set-cookie", rest.cookies || []);

  return {
    props: {
      data,
    },
  };
}

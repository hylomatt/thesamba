import Head from "next/head";
import React from "react";
import Link from "next/link";

import { Box, Grid, Typography, Hidden } from "@mui/material";

import { getTopic } from "../../../utils/getters";
import Header from "../../../components/Header";
import Breadcrumb from "../../../components/Breadcrumb";

export default function Main({ data }) {
  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.base.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Box mb={2}>
          <Typography variant="h4">{data.page.title}</Typography>
        </Box>
        <Box mb={2}>
          <Breadcrumb crumbs={data.page.nav} />
        </Box>

        <Hidden smDown>
          <Box py={1} mb={2} bgcolor="primary.main">
            <Grid container>
              <Grid item xs={2}>
                <Typography align="center" sx={{ color: "white" }}>
                  Author
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography align="center" sx={{ color: "white" }}>
                  Message
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Hidden>

        {data.page.posts.map((el, i) => (
          <Box mb={2} key={`topic-post-${i}`}>
            <Grid container>
              <Grid item xs={12} sm={12} md={2}>
                <Box p={1} bgcolor="secondary.light">
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Link href={el.name.href || ""} passHref>
                        {el.name.title}
                      </Link>
                    </Grid>
                    <Hidden mdUp>
                      <Grid item>
                        <Typography variant="body2">
                          {el.postDetails[0]}
                        </Typography>
                      </Grid>
                    </Hidden>
                  </Grid>
                  <Hidden smDown>
                    <Box
                      dangerouslySetInnerHTML={{ __html: el.posterDetails }}
                    ></Box>
                  </Hidden>
                </Box>
              </Grid>
              <Grid item xs={12} md={10}>
                <Box pl={{ xs: 0, md: 1 }}>
                  <Hidden smDown>
                    <Box mb={1} p={1} bgcolor="secondary.light">
                      <Typography
                        component="div"
                        dangerouslySetInnerHTML={{ __html: el.postDetails[0] }}
                      />
                      {/* <Typography component="div" dangerouslySetInnerHTML={{ __html: el.postDetails[1] }} /> */}
                    </Box>
                  </Hidden>
                  <Box py={1} px={2}>
                    <Typography
                      component="div"
                      sx={{ wordWrap: "break-word" }}
                      dangerouslySetInnerHTML={{ __html: el.content }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ))}
        <Box p={2}>
          <Grid container justifyContent="center">
            {data.page.pages.map((el, i) => (
              <Grid item key={`topic-page-${i}`} sx={{ margin: "0px 4px 8px" }}>
                {el.href ? (
                  <Link href={el.href || ""} passHref>
                    <Box
                      bgcolor="secondary.light"
                      sx={{
                        width: "40px",
                        textAlign: "center",
                        lineHeight: "40px",
                      }}
                    >
                      {el.title}
                    </Box>
                  </Link>
                ) : (
                  <Typography>
                    <Box
                      bgcolor="secondary.light"
                      sx={{
                        width: "40px",
                        textAlign: "center",
                        lineHeight: "40px",
                        ...(el.current && {
                          backgroundColor: "#fff",
                          outline: "1px solid #e7e7e7",
                        }),
                      }}
                    >
                      {el.title}
                    </Box>
                  </Typography>
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const { data, ...rest } = await getTopic(context.req);
  context.res.setHeader("set-cookie", rest.cookies || []);

  return {
    props: {
      data,
    },
  };
}

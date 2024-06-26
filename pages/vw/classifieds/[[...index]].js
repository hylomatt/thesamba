import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";

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
  IconButton,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";

import { getClassifieds } from "../../../utils/getters";
import Header from "../../../components/Header";
import ClassifiedsSearch from "../../../components/ClassifiedsSearch";

export default function Main({ data }) {
  const [showSearch, setShowSearch] = useState(false);

  const theme = useTheme();

  const handleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.base.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Grid container justifyContent="space-between">
          <Hidden smDown>
            <Grid item xs={11} md={3}>
              <Box
                mb={1}
                mr={{ md: 2 }}
                border={1}
                borderColor="secondary.light"
              >
                <Box bgcolor="secondary.light" p={1}>
                  <Typography>Categories</Typography>
                </Box>
                <Box p={1}>
                  {data.page.categories.map((el, i) => (
                    <React.Fragment key={`classifieds-categories-${i}-desktop`}>
                      <Box mb={1}>
                        <Typography>{el.title}</Typography>
                      </Box>
                      <Box mb={3}>
                        {el.items.map((subEl, subIdx) => (
                          <Box
                            key={`classifieds-subcategories-${subIdx}-desktop`}
                          >
                            <Link href={subEl.href} passHref>
                              {subEl.title}
                            </Link>
                          </Box>
                        ))}
                      </Box>
                    </React.Fragment>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={1}>
              <IconButton aria-label="search" size="small">
                <SearchIcon fontSize="inherit" />
              </IconButton>
            </Grid>
          </Hidden>

          <Hidden mdUp>
            <Grid item xs={12}>
              <Box mb={2} pr={6} position="relative">
                <Accordion square={true}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography
                      sx={{
                        display: "block",
                        fontSize: theme.typography.pxToRem(15),
                        flexShrink: 0,
                      }}
                    >
                      Categories
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails direction="column">
                    <Box width="100%">
                      {data.page.categories.map((el, i) => (
                        <Accordion
                          square={true}
                          key={`classifieds-categories-${i}-mobile`}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${i}bh-content`}
                            id={`panel${i}bh-header`}
                          >
                            <Typography
                              sx={{
                                display: "block",
                                fontSize: theme.typography.pxToRem(15),
                                flexShrink: 0,
                              }}
                            >
                              {el.title}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Box width="100%">
                              <List disablePadding={true}>
                                {el.items.map((sub, subIdx) => (
                                  <ListItem
                                    button
                                    key={`classifieds-subcategories-${subIdx}-mobile`}
                                  >
                                    <ListItemText>
                                      <Link
                                        href={sub.href}
                                        passHref
                                        sx={{
                                          display: "block",
                                          fontSize:
                                            theme.typography.pxToRem(15),
                                          flexShrink: 0,
                                        }}
                                      >
                                        {sub.title}
                                      </Link>
                                    </ListItemText>
                                  </ListItem>
                                ))}
                              </List>
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Box position="absolute" right="0" top="0">
                  <Paper variant="outlined" onClick={handleShowSearch}>
                    <IconButton
                      aria-label="search"
                      sx={{
                        width: "40px",
                        padding: "14px 0",
                        textAlign: "center",
                      }}
                      size="small"
                      variant="outlined"
                    >
                      <SearchIcon fontSize="default" />
                    </IconButton>
                  </Paper>
                </Box>
              </Box>
            </Grid>
          </Hidden>

          <Grid item xs={12} md={9}>
            {/* featured ads */}
            <Box mb={2} border={1} borderColor="secondary.light">
              <Box bgcolor="secondary.light" p={1}>
                <Typography>Featured Ads</Typography>
              </Box>
              <Box p={1}>
                <Grid container justifyContent="center" alignItems="flex-start">
                  {data.page.featuredAds.map((el, i) => (
                    <Grid
                      item
                      xs={6}
                      sm={4}
                      md={2}
                      key={`classifieds-random-ads-${i}`}
                    >
                      <Box px={2} pb={2} align="center">
                        <Link
                          href={el.href}
                          key={`classifieds-featured-ads-${i}`}
                        >
                          <div>
                            <img src={el.img.src} alt={el.title} />
                          </div>
                          <Typography align="center">{el.title}</Typography>
                        </Link>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>

            {/* random ads */}
            <Box mb={2} border={1} borderColor="secondary.light">
              <Box bgcolor="secondary.light" p={1}>
                <Typography>Random Featured Ads</Typography>
              </Box>
              <Box p={1}>
                <Grid container justifyContent="center" alignItems="flex-start">
                  {data.page.randomAds.map((el, i) => (
                    <Grid
                      item
                      xs={6}
                      sm={4}
                      md={2}
                      key={`classifieds-random-ads-${i}`}
                    >
                      <Box px={2} pb={2} align="center">
                        <Link href={el.href}>
                          <div>
                            <img src={el.img.src} alt={el.title} />
                          </div>
                          <Typography component="div" align="center">
                            <Box
                              {...(el.heavyTitle && {
                                fontWeight: "fontWeightBold",
                              })}
                            >
                              {el.title}
                            </Box>
                          </Typography>
                        </Link>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <ClassifiedsSearch open={showSearch} setOpen={setShowSearch} />
    </Box>
  );
}

export async function getServerSideProps(context) {
  const { data, ...rest } = await getClassifieds(context.req);
  context.res.setHeader("set-cookie", rest.cookies || []);

  return {
    props: {
      data,
    },
  };
}

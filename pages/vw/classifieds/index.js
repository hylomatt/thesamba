import Head from 'next/head'
import React from 'react'
import Link from 'next/link'

import { Box, Typography, Grid, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, Hidden } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/core/styles'

import { getClassifieds } from '../../../utils/getters'
import HeaderTop from '../../../components/HeaderTop'
import Header from '../../../components/Header'

import constants from '../../../utils/constants'

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white'
  },
  list: {
    width: 250
  },

  accRoot: {
    width: '100%'
  },
  heading: {
    display: 'block',
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0
  },

  popper: {
    minWidth: 200
  },

  menuItem: {
    justifyContent: 'center'
  },

  menuBtn: {
    height: 64
  }
}))

export default function ClassifiedIndex({ data }) {
  const classes = useStyles()

  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.title}</title>
      </Head>

      <HeaderTop data={data.preHeader} loggedIn={data.loggedIn} />
      <Header data={data.header} items={data.nav} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Grid container>
          <Hidden smDown>
            <Grid item xs={12} md={3}>
              <Box mb={1} mr={{ md: 2 }} border={1} borderColor="secondary.light">
                <Box bgcolor="secondary.light" p={1}>
                  <Typography>Categories</Typography>
                </Box>
                <Box p={1}>
                  {data.categories.map((el, i) => (
                    <React.Fragment key={`classifieds-categories-${i}-desktop`}>
                      <Box mb={1}>
                        <Typography>{el.title}</Typography>
                      </Box>
                      <Box mb={3}>
                        {el.items.map((subEl, subIdx) => (
                          <Box key={`classifieds-subcategories-${subIdx}-desktop`}>
                            <Link href={subEl.href} passHref>
                              <Typography component="a">{subEl.title}</Typography>
                            </Link>
                          </Box>
                        ))}
                      </Box>
                    </React.Fragment>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Hidden>

          <Hidden mdUp>
            <Grid item xs={12}>
              <Box mb={2}>
                <Accordion square={true}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Categories</Typography>
                  </AccordionSummary>
                  <AccordionDetails direction="column">
                    <Box width="100%">
                      {data.categories.map((el, i) => (
                        <Accordion square={true} key={`classifieds-categories-${i}-mobile`}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${i}bh-content`} id={`panel${i}bh-header`}>
                            <Typography className={classes.heading}>{el.title}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Box width="100%">
                              <List disablePadding={true}>
                                {el.items.map((sub, subIdx) => (
                                  <ListItem button key={`classifieds-subcategories-${subIdx}-mobile`}>
                                    <ListItemText>
                                      <Link href={sub.href} passHref>
                                        <Typography component="a" className={classes.heading}>
                                          {sub.title}
                                        </Typography>
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
                <Grid container justify="center" alignItems="flex-start">
                  {data.featuredAds.map((el, i) => (
                    <Grid item xs={6} sm={4} md={2} key={`classifieds-random-ads-${i}`}>
                      <Box px={2} pb={2} align="center">
                        <Link href={el.href} key={`classifieds-featured-ads-${i}`}>
                          <a>
                            <div>
                              <img src={`${constants.baseUrl}${el.img.src}`} />
                            </div>
                            <Typography align="center">{el.title}</Typography>
                          </a>
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
                <Grid container justify="center" alignItems="flex-start">
                  {data.randomAds.map((el, i) => (
                    <Grid item xs={6} sm={4} md={2} key={`classifieds-random-ads-${i}`}>
                      <Box px={2} pb={2} align="center">
                        <Link href={el.href}>
                          <a>
                            <div>
                              <img src={`${constants.baseUrl}${el.img.src}`} />
                            </div>
                            <Typography align="center">{el.title}</Typography>
                          </a>
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
    </Box>
  )
}

export async function getServerSideProps(context) {
  const { cookies, data } = await getClassifieds(context.req)
  context.res.setHeader('set-cookie', cookies || [])

  return {
    props: {
      data
    }
  }
}

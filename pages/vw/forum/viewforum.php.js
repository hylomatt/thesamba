import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { Box, Grid, Typography, Hidden, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { withStyles } from '@mui/styles'

import { getForum } from '../../../utils/getters'
import Header from '../../../components/Header'
import Pagination from '../../../components/Pagination'
import { formatDate } from '../../../utils/formatters'

import theme from '../../../utils/theme'

export default withStyles({
  root: {
    color: 'white'
  }
})(({ data, classes }) => {
  console.log(data)

  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.base.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Hidden xsDown>
          <Box bgcolor="primary.main">
            <Grid container>
              <Grid item xs={7}>
                <Box p={1}>
                  <Typography align="center" className={classes.root}>
                    Topics
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Box p={1}>
                  <Typography align="right" className={classes.root}>
                    Replies
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Box p={1}>
                  <Typography align="right" className={classes.root}>
                    Author
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Box p={1}>
                  <Typography align="right" className={classes.root}>
                    Views
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box p={1}>
                  <Typography align="right" className={classes.root}>
                    Last Post
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Hidden>

        {data.page.forumGroups.map((el, i) => {
          if (el.title.toLowerCase().includes('sticky')) {
            return (
              <Box mb={2} key={`forumGroup-${i}`}>
                <Accordion square={true} key={`classifieds-categories-${i}-mobile`}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${i}bh-content`} id={`panel${i}bh-header`}>
                    <Typography className={classes.heading}>
                      {el.title} ({el.items.length})
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box width="100%">
                      <List disablePadding={true}>
                        {el.items.map((sub, subIdx) => (
                          <ListItem button style={{ alignItems: 'flex-start', border: `1px solid ${theme.palette.secondary.light}`, borderWidth: '0 0 1px' }} key={`classifieds-subcategories-${subIdx}-mobile`}>
                            <ListItemText>
                              <Link href={sub.href} passHref>
                                <Typography component="a" className={classes.heading}>
                                  {sub.title}
                                </Typography>
                              </Link>
                            </ListItemText>
                            <ListItemText style={{ textAlign: 'right', whiteSpace: 'nowrap', flex: '0 0 80px' }}>{formatDate(sub.lastPost.text).short}</ListItemText>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
            )
          }

          return (
            <Box mb={2} key={`forumGroup-${i}`}>
              <Box p={1} bgcolor="secondary.light">
                <Typography variant="subtitle1">{el.title}</Typography>
              </Box>
              <Box py={1}>
                {el.items.map((subEl, subI) => (
                  <Box py={1} px={1} mb={0} key={`forum-${i}-${subI}`}>
                    <Grid container>
                      <Grid item xs={12} sm={7}>
                        <Box mb={{ xs: 0, sm: 0 }}>
                          {/* {subEl.newPosts ? '!' : ''} */}

                          <Link href={subEl.href || ''} passHref>
                            <Typography component="a" className="font-semibold">
                              {subEl.title}
                            </Typography>
                          </Link>
                          <Typography>{subEl.description}</Typography>
                        </Box>
                      </Grid>
                      <Hidden smDown>
                        <Grid item xs={2} sm={1}>
                          <Typography align="right">{subEl.replies}</Typography>
                        </Grid>
                        <Grid item xs={5} sm={1} align="right">
                          <Typography align="right">{subEl.author.text}</Typography>
                          <Link href={subEl.author.user.href}>
                            <Typography component="a" align="right">
                              {subEl.author.user.title}
                            </Typography>
                          </Link>
                        </Grid>
                        <Grid item xs={2} sm={1}>
                          <Typography align="right">{subEl.views}</Typography>
                        </Grid>
                        <Grid item xs={3} sm={2}>
                          <Typography align="right">{subEl.lastPost.text}</Typography>
                        </Grid>
                      </Hidden>
                    </Grid>
                  </Box>
                ))}
              </Box>
            </Box>
          )
        })}
      </Box>

      <Pagination pages={data.page.pages} />
    </Box>
  )
})

export async function getServerSideProps(context) {
  const { data, ...rest } = await getForum(context.req)
  context.res.setHeader('set-cookie', rest.cookies || [])

  return {
    props: {
      data
    }
  }
}

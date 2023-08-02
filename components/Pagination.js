import React from 'react'
import Link from 'next/link'

import { Box, Typography, Grid } from '@mui/material'
import { withStyles } from '@mui/styles'

export default withStyles((theme) => ({
  root: {
    color: 'white'
  },
  pagingText: {
    display: 'block',
    lineHeight: '30px',
    height: '30px'
  },
  pagingPrevNextGrid: {
    width: '100px',
    textAlign: 'center'
  },
  pagingPrevNext: {
    background: theme.palette.secondary.main,
    borderRadius: '4px'
  }
}))(({ pages, classes }) => {
  const onlyPages = pages.filter((page) => !['previous', 'next'].includes(page.title.toLowerCase()))
  const currentPage = onlyPages.findIndex((page) => !page.href.length)
  const prevPage = pages.find((page) => page.title.toLowerCase() === 'previous')
  const nextPage = pages.find((page) => page.title.toLowerCase() === 'next')
  const totalPages = onlyPages ? onlyPages.slice(-1)[0].title : null

  return (
    <Box py={2} bgcolor="secondary.light">
      <Grid container justify="space-evenly">
        <Grid item className={classes.pagingPrevNextGrid}>
          {prevPage
            ? (
              <Link href={prevPage.href}>
                <Typography component="a" className={[classes.pagingText, classes.pagingPrevNext]}>
                Previous
                </Typography>
              </Link>
            )
            : (
              <Box></Box>
            )}
        </Grid>
        <Grid item>
          <Typography className={classes.pagingText}>
            {currentPage + 1} / {totalPages}
          </Typography>
        </Grid>
        <Grid item className={classes.pagingPrevNextGrid}>
          {nextPage
            ? (
              <Link href={nextPage.href}>
                <Typography component="a" className={[classes.pagingText, classes.pagingPrevNext]}>
                Next
                </Typography>
              </Link>
            )
            : (
              <Box></Box>
            )}
        </Grid>
      </Grid>
    </Box>
  )
})

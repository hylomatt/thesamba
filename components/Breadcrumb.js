import React from 'react'
import Link from 'next/link'

import { Typography, Divider, Grid } from '@mui/material'
import { withStyles } from '@mui/styles'

export default withStyles((theme) => ({
  divider: {
    background: theme.palette.primary.light,
    margin: '0px 4px',
    height: '12px'
  }
}))(({ crumbs, classes }) => {
  return (
    <Grid container alignItems="center">
      {crumbs.map((el, i) => {
        const output = []

        if (el.href) {
          output.push(
            <Link href={el.href} key={`breadcrumb-nav-${i}-${el.title}-${el.href}`} passHref>
              <Typography component="a" variant="body2">
                {el.title}
              </Typography>
            </Link>
          )
        } else {
          output.push(
            <Typography component="span" variant="body2" key={`breadcrumb-nav-${i}-${el.title}`}>
              {el.title}
            </Typography>
          )
        }

        if (i < crumbs.length - 1) {
          output.push(<Divider orientation="vertical" className={classes.divider} key={`breadcrumb-nav-${i}-${el.title}-divider`} />)
        }

        return output
      })}
    </Grid>
  )
})

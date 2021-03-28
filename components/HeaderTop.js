import React from 'react'
import Link from 'next/link'
import { Box, Grid, Typography, Divider, Hidden } from '@material-ui/core'

const HeaderTop = ({ data, isLoggedIn }) => {
  return (
    <Hidden smDown>
      <Box bgcolor="secondary.main" py={1} px={1}>
        <Grid container alignItems="center">
          {isLoggedIn
            ? (
              <>
                <Box>
                  <Typography>Hello,</Typography>
                </Box>
                <Link href="/vw/forum/login.php?logout=true">
                  <a>Log out</a>
                </Link>
              </>
            )
            : (
              <>
                <Box mr={2}>
                  <Typography>Hello!</Typography>
                </Box>
                <Link href="/vw/forum/login.php">
                  <a>Log in</a>
                </Link>
                <Box mx={1}>
                  <Typography>or</Typography>
                </Box>
                <Link href="/vw/forum/profile.php?mode=register">
                  <a>Register</a>
                </Link>
              </>
            )}
          <Box mx={2} height={16}>
            <Divider orientation="vertical" />
          </Box>
          <Link href="/vw/contact.php">
            <a>Help</a>
          </Link>
          <Box mx={2} height={16}>
            <Divider orientation="vertical" />
          </Box>
          <Link href="/vw/donate.php">
            <a>Donate</a>
          </Link>
          <Box mx={2} height={16}>
            <Divider orientation="vertical" />
          </Box>
          <Link href="/vw/products/">
            <a>Buy Shirts</a>
          </Link>

          <Box flex="auto"></Box>

          <Link href="/vw/allbanners.php">
            <a>See all banner ads</a>
          </Link>
          <Box mx={2} height={16}>
            <Divider orientation="vertical" />
          </Box>
          <Link href="/vw/banners.php">
            <a>Advertise on TheSamba.com</a>
          </Link>
        </Grid>
      </Box>
    </Hidden>
  )
}

export default HeaderTop

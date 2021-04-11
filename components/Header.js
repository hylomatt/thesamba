import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Box, Grid, Hidden, IconButton, Drawer, List, ListItem, ListItemText, Typography, Accordion, AccordionDetails, AccordionSummary, Button, MenuItem, Popper, ClickAwayListener, Grow, Paper, MenuList, Divider } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'

export default withStyles((theme) => ({
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
}))(({ data: { header, preHeader, loggedIn, nav }, classes, selected = null }) => {
  const [menu, setMenu] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(null)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleToggle = (e, idx) => {
    setAnchorEl(e.target.parentElement)
    setOpen(idx)
  }

  const handleClose = (idx) => {
    if (idx !== open) {
      return
    }

    setOpen(null)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  return (
    <>
      <HeaderTop data={preHeader} loggedIn={loggedIn} />
      <Box bgcolor="primary.dark">
        <Grid container justify="space-between" alignItems="center" wrap="nowrap">
          <Hidden mdUp>
            <IconButton className={classes.menuBtn} aria-label="menu" color="secondary" onClick={() => setMenu(true)}>
              <MenuIcon fontSize="large" color="secondary" />
            </IconButton>
            <Link href={header.logo.href}>
              <a>
                <Image src={header.logo.src} alt="" width={213} height={40} />
              </a>
            </Link>
            <Box width={53.47}></Box>
          </Hidden>
          <Hidden smDown>
            <Link href={header.logo.href}>
              <a>
                <Image src={header.logo.src} alt="" width={320} height={60} />
              </a>
            </Link>
          </Hidden>
        </Grid>
      </Box>
      <Drawer open={menu} onClose={() => setMenu(false)}>
        <div className={classes.list} role="presentation" /* onClick={() => setMenu(false)} */>
          {loggedIn && (
            <Box p={2}>
              <Typography>
                Hello, <strong>{preHeader.user}</strong>
              </Typography>
            </Box>
          )}

          <div className={classes.accRoot}>
            {nav.map((el, i) => (
              <Accordion square={true} expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)} key={`nav-item-${el.title.toLowerCase().replace(/[^a-z0-9]/, '-')}`}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${i}bh-content`} id={`panel${i}bh-header`}>
                  <Typography className={classes.heading}>{el.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List disablePadding={true}>
                    <ListItem button>
                      <ListItemText>
                        <Link href={el.href} passHref>
                          <Typography component="a" className={classes.heading}>
                            {el.title} Index
                          </Typography>
                        </Link>
                      </ListItemText>
                    </ListItem>

                    {el.items.map((sub, subIdx) => (
                      <ListItem button key={`nav-mobile-subitem-${sub.title.toLowerCase().replace(/[^a-z0-9]/, '-')}`}>
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
                </AccordionDetails>
              </Accordion>
            ))}
          </div>

          <Divider />

          <List>
            {!loggedIn
              ? (
                <>
                  <ListItem button>
                    <ListItemText>
                      <Link href="/vw/forum/login.php?redirect=/vw/index.php" passHref>
                        <Typography component="a" className={classes.heading}>
                        Login
                        </Typography>
                      </Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem button>
                    <ListItemText>
                      <Link href="/vw/forum/profile.php?mode=register">
                        <Typography component="a" className={classes.heading}>
                        Register
                        </Typography>
                      </Link>
                    </ListItemText>
                  </ListItem>

                  <ListItem button>
                    <ListItemText>
                      <Link href="/vw/contact.php">
                        <Typography component="a" className={classes.heading}>
                        Help
                        </Typography>
                      </Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem button>
                    <ListItemText>
                      <Link href="/vw/donate.php">
                        <Typography component="a" className={classes.heading}>
                        Donate
                        </Typography>
                      </Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem button>
                    <ListItemText>
                      <Link href="/vw/products/">
                        <Typography component="a" className={classes.heading}>
                        Buy Shirts
                        </Typography>
                      </Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem button>
                    <ListItemText>
                      <Link href="/vw/allbanners.php">
                        <Typography component="a" className={classes.heading}>
                        See all banner ads
                        </Typography>
                      </Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem button>
                    <ListItemText>
                      <Link href="/vw/banners.php">
                        <Typography component="a" className={classes.heading}>
                        Advertise on TheSamba.com
                        </Typography>
                      </Link>
                    </ListItemText>
                  </ListItem>
                </>
              )
              : (
                <>
                  <ListItem button>
                    <ListItemText>
                      <Link href={preHeader.logoutLink}>
                        <a>Log out</a>
                      </Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem button>
                    <ListItemText>
                      <Link href="/vw/forum/profile.php?mode=editprofile">
                        <a>Control Panel</a>
                      </Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem button>
                    <ListItemText>
                      <Link href="/vw/forum/privmsg.php?folder=inbox">
                        <a>PMs: {preHeader.pms}</a>
                      </Link>
                    </ListItemText>
                  </ListItem>
                </>
              )}
          </List>
        </div>
      </Drawer>

      <Hidden smDown>
        <Box bgcolor="primary.main">
          <Grid container justify="center" alignItems="center">
            {nav.map((el, i) => (
              <React.Fragment key={`nav-item-${el.title.toLowerCase().replace(/[^a-z0-9]/, '-')}`}>
                <Box px={2} py={1}>
                  <Button className={classes.root} aria-haspopup="true" aria-controls={open === i ? 'menu-list-grow' : undefined} onClick={(e) => handleToggle(e, i)}>
                    {el.title}
                  </Button>
                </Box>

                <Popper open={open === i} anchorEl={anchorEl} role={undefined} transition disablePortal placement="bottom" className={classes.popper}>
                  {({ TransitionProps, placement }) => (
                    <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                      <Paper>
                        <ClickAwayListener onClickAway={() => handleClose(i)}>
                          <MenuList autoFocusItem={open === i} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            <MenuItem onClick={() => handleClose(i)} className={classes.menuItem}>
                              <Link href={el.href} passHref>
                                <Typography component="a">{el.title}</Typography>
                              </Link>
                            </MenuItem>
                            {el.items.map((sub) => (
                              <MenuItem onClick={() => handleClose(i)} className={classes.menuItem} key={`nav-desktop-subitem-${sub.title.toLowerCase().replace(/[^a-z0-9]/, '-')}`}>
                                <Link href={sub.href} passHref>
                                  <Typography component="a">{sub.title}</Typography>
                                </Link>
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </React.Fragment>
            ))}
          </Grid>
        </Box>
      </Hidden>
    </>
  )
})

const HeaderTop = ({ data, loggedIn }) => {
  return (
    <Hidden smDown>
      <Box bgcolor="secondary.main" py={1} px={1}>
        <Grid container alignItems="center">
          {loggedIn
            ? (
              <>
                <Box>
                  <Typography>
                  Hello, <strong>{data.user}</strong>
                  </Typography>
                </Box>
                <Box mx={1} height={16}>
                  <Divider orientation="vertical" />
                </Box>
                <Link href={data.logoutLink}>
                  <a>Log out</a>
                </Link>
                <Box mx={1} height={16}>
                  <Divider orientation="vertical" />
                </Box>
                <Link href="/vw/forum/profile.php?mode=editprofile">
                  <a>Control Panel</a>
                </Link>
                <Box mx={1} height={16}>
                  <Divider orientation="vertical" />
                </Box>
                <Link href="/vw/forum/privmsg.php?folder=inbox">
                  <a>PMs: {data.pms}</a>
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
          <Box mx={1} height={16}>
            <Divider orientation="vertical" />
          </Box>
          <Link href="/vw/contact.php">
            <a>Help</a>
          </Link>
          <Box mx={1} height={16}>
            <Divider orientation="vertical" />
          </Box>
          <Link href="/vw/donate.php">
            <a>Donate</a>
          </Link>
          <Box mx={1} height={16}>
            <Divider orientation="vertical" />
          </Box>
          <Link href="/vw/products/">
            <a>Buy Shirts</a>
          </Link>

          <Box flex="auto"></Box>

          <Link href="/vw/allbanners.php">
            <a>See all banner ads</a>
          </Link>
          <Box mx={1} height={16}>
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

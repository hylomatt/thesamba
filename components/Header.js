import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Box, Grid, Hidden, IconButton, Drawer, List, ListItem, ListItemText, Typography, Accordion, AccordionDetails, AccordionSummary, Button, MenuItem, Popper, ClickAwayListener, Grow, Paper, MenuList, Divider } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'

import constants from '../utils/constants'

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
}))(function Header({ data, classes, items, selected = null }) {
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
      <Box bgcolor="primary.dark">
        <Grid container justify="space-between" alignItems="center" wrap="nowrap">
          <Hidden mdUp>
            <IconButton className={classes.menuBtn} aria-label="menu" color="secondary" onClick={() => setMenu(true)}>
              <MenuIcon fontSize="large" color="secondary" />
            </IconButton>
            <Link href={data.logo.href}>
              <a>
                <Image src={`${constants.baseUrl}${data.logo.src}`} alt="" width={213} height={40} />
              </a>
            </Link>
            <Box width={53.47}></Box>
          </Hidden>
          <Hidden smDown>
            <Link href={data.logo.href}>
              <a>
                <Image src={`${constants.baseUrl}${data.logo.src}`} alt="" width={320} height={60} />
              </a>
            </Link>
          </Hidden>
        </Grid>
      </Box>
      <Drawer open={menu} onClose={() => setMenu(false)}>
        <div className={classes.list} role="presentation" /* onClick={() => setMenu(false)} */>
          <div className={classes.accRoot}>
            {items.map((el, i) => (
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
            <ListItem button>
              <ListItemText>
                <Link href="/vw/forum/login.php?redirect=/vw/index.php" passHref>
                  <Typography component="a" className={classes.heading}>
                    Login
                  </Typography>
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </div>
      </Drawer>

      <Hidden smDown>
        <Box bgcolor="primary.main">
          <Grid container justify="center" alignItems="center">
            {items.map((el, i) => (
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

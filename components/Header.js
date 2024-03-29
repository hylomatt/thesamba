import React, { useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import Link from "@mui/material/Link";

import {
  Box,
  Grid,
  Hidden,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  MenuItem,
  Popper,
  ClickAwayListener,
  Grow,
  Paper,
  MenuList,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";

export default function Main({
  data: {
    base: { header, preHeader, loggedIn, nav },
  },
  selected = null,
}) {
  const [menu, setMenu] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(null);

  const theme = useTheme();

  const StyledHeading = styled(Typography)(({ theme }) => ({
    display: "block",
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0,
  }));

  const StyledHeadingLink = styled(Link)(({ theme }) => ({
    display: "block",
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0,
  }));

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleToggle = (e, idx) => {
    setAnchorEl(e.target.parentElement);
    setOpen(idx);
  };

  const handleClose = (idx) => {
    if (idx !== open) {
      return;
    }

    setOpen(null);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <>
      <HeaderTop data={preHeader} loggedIn={loggedIn} />
      <Box bgcolor="primary.dark">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          wrap="nowrap"
        >
          <Hidden mdUp>
            <IconButton
              sx={{ height: 64 }}
              aria-label="menu"
              color="secondary"
              onClick={() => setMenu(true)}
            >
              <MenuIcon fontSize="large" color="secondary" />
            </IconButton>
            <Link href={header.logo.href}>
              <Image src={header.logo.src} alt="" width={213} height={40} />
            </Link>
            <Box width={53.47}></Box>
          </Hidden>
          <Hidden smDown>
            <Link href={header.logo.href}>
              <Image src={header.logo.src} alt="" width={320} height={60} />
            </Link>
          </Hidden>
        </Grid>
      </Box>
      <Drawer open={menu} onClose={() => setMenu(false)}>
        <div
          sx={{ width: 250 }}
          role="presentation" /* onClick={() => setMenu(false)} */
        >
          {loggedIn && (
            <Box p={2}>
              <Typography>
                Hello, <strong>{preHeader.user}</strong>
              </Typography>
            </Box>
          )}

          <div sx={{ width: "100%" }}>
            {nav.map((el, i) => (
              <Accordion
                square={true}
                expanded={expanded === `panel${i}`}
                onChange={handleChange(`panel${i}`)}
                key={`nav-item-${el.title.toLowerCase().replace(/[^a-z0-9]/, "-")}`}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${i}bh-content`}
                  id={`panel${i}bh-header`}
                >
                  <StyledHeading>{el.title}</StyledHeading>
                </AccordionSummary>
                <AccordionDetails>
                  <List disablePadding={true} sx={{ width: "100%" }}>
                    <ListItem
                      component="li"
                      button
                      sx={{ paddingTop: 0, paddingBottom: 0 }}
                    >
                      <ListItemText sx={{ marginTop: 0, marginBottom: 0 }}>
                        <Link
                          href={el.href}
                          passHref
                          sx={{
                            display: "block",
                            fontSize: theme.typography.pxToRem(15),
                            flexShrink: 0,
                            padding: "10px 0",
                          }}
                        >
                          {el.title} Index
                        </Link>
                      </ListItemText>
                    </ListItem>

                    {el.items.map((sub, subIdx) => (
                      <ListItem
                        button
                        sx={{ paddingTop: 0, paddingBottom: 0 }}
                        key={`nav-mobile-subitem-${sub.title.toLowerCase().replace(/[^a-z0-9]/, "-")}`}
                      >
                        <ListItemText sx={{ marginTop: 0, marginBottom: 0 }}>
                          <Link
                            component={NextLink}
                            href={sub.href}
                            passHref
                            sx={{
                              display: "block",
                              fontSize: theme.typography.pxToRem(15),
                              flexShrink: 0,
                              padding: "10px 0",
                            }}
                          >
                            {sub.title}
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
            {!loggedIn ? (
              <>
                <ListItem button>
                  <ListItemText>
                    <StyledHeadingLink
                      href="/vw/forum/login.php?redirect=/vw/index.php"
                      passHref
                    >
                      Login
                    </StyledHeadingLink>
                  </ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemText>
                    <StyledHeadingLink href="/vw/forum/profile.php?mode=register">
                      Register
                    </StyledHeadingLink>
                  </ListItemText>
                </ListItem>

                <ListItem button>
                  <ListItemText>
                    <StyledHeadingLink href="/vw/contact.php">
                      Help
                    </StyledHeadingLink>
                  </ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemText>
                    <StyledHeadingLink href="/vw/donate.php">
                      Donate
                    </StyledHeadingLink>
                  </ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemText>
                    <StyledHeadingLink href="/vw/products/">
                      Buy Shirts
                    </StyledHeadingLink>
                  </ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemText>
                    <StyledHeadingLink href="/vw/allbanners.php">
                      See all banner ads
                    </StyledHeadingLink>
                  </ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemText>
                    <StyledHeadingLink href="/vw/banners.php">
                      Advertise on TheSamba.com
                    </StyledHeadingLink>
                  </ListItemText>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button>
                  <ListItemText>
                    <Link href={preHeader.logoutLink}>Log out</Link>
                  </ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemText>
                    <Link href="/vw/forum/profile.php?mode=editprofile">
                      Control Panel
                    </Link>
                  </ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemText>
                    <Link href="/vw/forum/privmsg.php?folder=inbox">
                      PMs: {preHeader.pms}
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
          <Grid container justifyContent="center" alignItems="center">
            {nav.map((el, i) => (
              <React.Fragment
                key={`nav-item-${el.title.toLowerCase().replace(/[^a-z0-9]/, "-")}`}
              >
                <Box px={2} py={1}>
                  <Button
                    sx={{ color: "white" }}
                    aria-haspopup="true"
                    aria-controls={open === i ? "menu-list-grow" : undefined}
                    onClick={(e) => handleToggle(e, i)}
                  >
                    {el.title}
                  </Button>
                </Box>

                <Popper
                  open={open === i}
                  anchorEl={anchorEl}
                  role={undefined}
                  transition
                  disablePortal
                  placement="bottom"
                  sx={{ minWidth: 200 }}
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={() => handleClose(i)}>
                          <MenuList
                            autoFocusItem={open === i}
                            id="menu-list-grow"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem
                              onClick={() => handleClose(i)}
                              sx={{ justifyContent: "center" }}
                            >
                              <Link href={el.href} passHref>
                                {el.title}
                              </Link>
                            </MenuItem>
                            {el.items.map((sub) => (
                              <MenuItem
                                onClick={() => handleClose(i)}
                                sx={{ justifyContent: "center" }}
                                key={`nav-desktop-subitem-${sub.title.toLowerCase().replace(/[^a-z0-9]/, "-")}`}
                              >
                                <Link href={sub.href} passHref>
                                  {sub.title}
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
  );
}

const HeaderTop = ({ data, loggedIn }) => {
  return (
    <Hidden smDown>
      <Box bgcolor="secondary.main" py={1} px={1}>
        <Grid container alignItems="center">
          {loggedIn ? (
            <>
              <Box>
                <Typography>
                  Hello, <strong>{data.user}</strong>
                </Typography>
              </Box>
              <Box mx={1} height={16}>
                <Divider orientation="vertical" />
              </Box>
              <Link href={data.logoutLink}>Log out</Link>
              <Box mx={1} height={16}>
                <Divider orientation="vertical" />
              </Box>
              <Link href="/vw/forum/profile.php?mode=editprofile">
                Control Panel
              </Link>
              <Box mx={1} height={16}>
                <Divider orientation="vertical" />
              </Box>
              <Link href="/vw/forum/privmsg.php?folder=inbox">
                PMs: {data.pms}
              </Link>
            </>
          ) : (
            <>
              <Box mr={2}>
                <Typography>Hello!</Typography>
              </Box>
              <Link href="/vw/forum/login.php">Log in</Link>
              <Box mx={1}>
                <Typography>or</Typography>
              </Box>
              <Link href="/vw/forum/profile.php?mode=register">Register</Link>
            </>
          )}
          <Box mx={1} height={16}>
            <Divider orientation="vertical" />
          </Box>
          <Link href="/vw/contact.php">Help</Link>
          <Box mx={1} height={16}>
            <Divider orientation="vertical" />
          </Box>
          <Link href="/vw/donate.php">Donate</Link>
          <Box mx={1} height={16}>
            <Divider orientation="vertical" />
          </Box>
          <Link href="/vw/products/">Buy Shirts</Link>

          <Box flex="auto"></Box>

          <Link href="/vw/allbanners.php">See all banner ads</Link>
          <Box mx={1} height={16}>
            <Divider orientation="vertical" />
          </Box>
          <Link href="/vw/banners.php">Advertise on TheSamba.com</Link>
        </Grid>
      </Box>
    </Hidden>
  );
};

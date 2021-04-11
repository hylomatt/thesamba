import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { Box, Typography, Grid, FormControl, TextField, InputLabel, Select, FormGroup, Button } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { withStyles } from '@material-ui/core/styles'

import { getProfile, getProfileRegister, getProfileRegisterAgreed } from '../../../utils/getters'
import Header from '../../../components/Header'

export default function Profile({ query, data }) {
  console.log(data)

  const { profileMode, agreed } = query

  if (profileMode === 'editprofile') {
    return <ProfileEdit data={data} />
  } else if (profileMode === 'viewprofile') {
    return <ProfileView data={data} />
  } else if (profileMode === 'register' && agreed === 'true') {
    return <ProfileRegisterAgreed data={data} />
  } else if (profileMode === 'register') {
    return <ProfileRegister data={data} />
  }
  return null
}

const ProfileView = withStyles({
  root: {
    color: 'white'
  }
})(({ profileMode, data, classes }) => {
  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Box mb={1} border={1} borderColor="primary.main">
          <Box bgcolor="primary.main" p={1}>
            <Typography align="center" className={classes.root}>
              {data.profile.title}
            </Typography>
          </Box>
        </Box>

        <Box mb={1} border={1} borderColor="secondary.main">
          <Box bgcolor="secondary.main" p={1}>
            <Typography align="center">Avatar</Typography>
          </Box>
          <Box p={1} align="center">
            {data.profile.avatar.img.src
              ? (
                <div style={{ position: 'relative', width: '100%', height: '66px', paddingBottom: '20%' }}>
                  <Image src={data.profile.avatar.img.src} alt={data.profile.avatar.img.alt} layout="fill" objectFit="contain" />
                </div>
              )
              : (
                <Skeleton variant="rect" height="66px" width="100px" animation="wave" />
              )}
          </Box>
        </Box>

        <Box mb={1} border={1} borderColor="secondary.main">
          <Box bgcolor="secondary.main" p={1}>
            <Typography align="center">All about...</Typography>
          </Box>
          <Box p={1}>
            <Grid container>
              {data.profile.info.map((el, i) => (
                <React.Fragment key={`profile-contact-${data.profile.title}-${i}`}>
                  <Grid item xs={6}>
                    <Typography>{el[0]}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component="div" dangerouslySetInnerHTML={{ __html: el[1] }} />
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Box>
        </Box>

        <Box mb={1} border={1} borderColor="secondary.main">
          <Box bgcolor="secondary.main" p={1}>
            <Typography align="center">Contact</Typography>
          </Box>
          <Box p={1}>
            <Grid container>
              {data.profile.contact.map((el, i) => (
                <React.Fragment key={`profile-contact-${data.profile.title}-${i}`}>
                  <Grid item xs={6}>
                    <Typography>{el[0]}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component="div" dangerouslySetInnerHTML={{ __html: el[1] }} />
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Box>
        </Box>

        <Box mb={1} border={1} borderColor="secondary.main">
          <Box bgcolor="secondary.main" p={1}>
            <Typography align="center">Signature</Typography>
          </Box>
          <Box p={1}>
            <Typography component="div" dangerouslySetInnerHTML={{ __html: data.profile.signature }} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
})

const ProfileEdit = withStyles({
  root: {
    color: 'white'
  }
})(({ profileMode, data, classes }) => {
  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Box mb={1} border={1} borderColor="primary.main">
          <Box bgcolor="primary.main" p={1}>
            <Typography align="center" className={classes.root}>
              {data.profile.title}
            </Typography>
          </Box>
        </Box>

        <Box mb={1} border={1} borderColor="secondary.main">
          <Box bgcolor="secondary.main" p={1}>
            <Typography align="center">Avatar</Typography>
          </Box>
          <Box p={1} align="center">
            {data.profile.avatar.img.src
              ? (
                <div style={{ position: 'relative', width: '100%', height: '66px', paddingBottom: '20%' }}>
                  <Image src={data.profile.avatar.img.src} alt={data.profile.avatar.img.alt} layout="fill" objectFit="contain" />
                </div>
              )
              : (
                <Skeleton variant="rect" height="66px" width="100px" animation="wave" />
              )}
          </Box>
        </Box>

        <Box mb={1} border={1} borderColor="secondary.main">
          <Box bgcolor="secondary.main" p={1}>
            <Typography align="center">All about...</Typography>
          </Box>
          <Box p={1}>
            <Grid container>
              {data.profile.info.map((el, i) => (
                <React.Fragment key={`profile-contact-${data.profile.title}-${i}`}>
                  <Grid item xs={6}>
                    <Typography>{el[0]}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component="div" dangerouslySetInnerHTML={{ __html: el[1] }} />
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Box>
        </Box>

        <Box mb={1} border={1} borderColor="secondary.main">
          <Box bgcolor="secondary.main" p={1}>
            <Typography align="center">Contact</Typography>
          </Box>
          <Box p={1}>
            <Grid container>
              {data.profile.contact.map((el, i) => (
                <React.Fragment key={`profile-contact-${data.profile.title}-${i}`}>
                  <Grid item xs={6}>
                    <Typography>{el[0]}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component="div" dangerouslySetInnerHTML={{ __html: el[1] }} />
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Box>
        </Box>

        <Box mb={1} border={1} borderColor="secondary.main">
          <Box bgcolor="secondary.main" p={1}>
            <Typography align="center">Signature</Typography>
          </Box>
          <Box p={1}>
            <Typography component="div" dangerouslySetInnerHTML={{ __html: data.profile.signature }} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
})

const ProfileRegister = withStyles({
  root: {
    color: 'white'
  }
})(({ data, classes }) => {
  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Box mb={1} border={1} borderColor="primary.main">
          <Box bgcolor="primary.main" p={1}>
            <Typography align="center" className={classes.root}>
              {data.register.title}
            </Typography>
          </Box>

          <Box mb={1} p={2}>
            <Typography component="div" dangerouslySetInnerHTML={{ __html: data.register.content }} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
})

const ProfileRegisterAgreed = withStyles((theme) => ({
  root: {
    color: 'white'
  },
  mb1: {
    marginBottom: theme.spacing(1)
  },
  mb2: {
    marginBottom: theme.spacing(2)
  },
  mb3: {
    marginBottom: theme.spacing(3)
  },
  py15: {
    padding: theme.spacing(1.5)
  }
}))(({ data, classes }) => {
  // const [values, setValues] = useState(data.registerAgreed.hiddenInputs)
  const [values, setValues] = useState({
    ...data.registerAgreed.hiddenInputs
  })

  const handleChange = (prop) => (event) => {
    console.log(prop, event.target.value)
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    return false
  }

  const TField = ({ label, name, maxLength, ...rest }) => {
    return <TextField variant="outlined" fullWidth={true} onChange={handleChange(name)} value={values[name]} label={label} name={name} maxLength={maxLength} {...rest} />
  }

  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1} mb={3}>
        <form>
          <Box mb={1} border={1} borderColor="primary.main">
            <Box bgcolor="primary.main" p={1}>
              <Typography align="center" className={classes.root}>
                Registration Information
              </Typography>
            </Box>
            <Box p={2}>
              <Typography className={classes.mb2}>Items marked with a * are required unless stated otherwise.</Typography>
              <FormControl fullWidth={true} className={classes.mb3}>
                <TField label="Username" name="username" maxLength="25" required />
              </FormControl>
              <FormGroup className={classes.mb3}>
                <FormControl fullWidth={true} className={classes.mb1}>
                  <TField type="email" label="E-mail address" name="email" maxLength="255" required />
                </FormControl>
                <FormControl fullWidth={true}>
                  <TField type="email" label="Confirm your email address" name="email_confirm" maxLength="255" required />
                </FormControl>
              </FormGroup>
              <FormGroup className={classes.mb3}>
                <FormControl fullWidth={true} className={classes.mb1}>
                  <TField type="password" label="Password" name="new_password" maxLength="32" required />
                </FormControl>
                <FormControl fullWidth={true}>
                  <TField type="password" label="Confirm password" name="password_confirm" maxLength="32" required />
                </FormControl>
              </FormGroup>
              <FormControl fullWidth={true} className={classes.mb3}>
                <Typography className={classes.mb1}>
                  What make of vehicle does this site cover?
                  <br />
                  (2 letters, starts with a V - Uppercase letters only)
                </Typography>
                <TField label="Signup question" required name="RAC" maxLength="32" />
              </FormControl>
              <FormGroup>
                <Typography>
                  If you are visually impaired or cannot otherwise read this code please contact the <a href="mailto:everettb@thesamba.com">Administrator</a> for help.
                </Typography>
                <Box mb={1} py={1}>
                  <img src={data.registerAgreed.confirmImage.src} width="100%" />
                </Box>
                <FormControl fullWidth={true} className={classes.mb1}>
                  <TField label="Confirmation code" name="confirm_code" maxLength="6" required />
                </FormControl>
                <Typography variant="body2">Enter the code exactly as you see it. The code is case sensitive and zero has a diagonal line through it.</Typography>
              </FormGroup>
            </Box>
          </Box>
          <Box mb={1} border={1} borderColor="primary.main">
            <Box bgcolor="primary.main" p={1}>
              <Typography align="center" className={classes.root}>
                Profile Information
              </Typography>
            </Box>
            <Box p={2}>
              <Typography className={classes.mb1}>This information will be publicly viewable</Typography>
              <FormControl fullWidth={true} className={classes.mb1}>
                <TField label="Location" name="location" maxLength="100" required />
              </FormControl>
              <FormControl fullWidth={true} className={classes.mb1}>
                <TField label="Occupation" name="occupation" maxLength="100" required />
              </FormControl>
              <FormControl fullWidth={true}>
                <TField label="Interests" name="interests" maxLength="150" required />
              </FormControl>
            </Box>
          </Box>
          <Box mb={4} border={1} borderColor="primary.main">
            <Box bgcolor="primary.main" p={1}>
              <Typography align="center" className={classes.root}>
                Preferences
              </Typography>
            </Box>
            <Box p={2}>
              <FormControl variant="outlined" fullWidth={true} className={classes.mb2}>
                <InputLabel htmlFor="outlined-age-native-simple">Board Language</InputLabel>
                <Select
                  native
                  value={values.boardLanguage}
                  onChange={handleChange}
                  label="Board Language"
                  inputProps={{
                    name: 'boardLanguage',
                    id: 'outlined-language-native-simple'
                  }}
                >
                  {data.registerAgreed.boardLanguage.map((el, i) => (
                    <option value={el.value} selected={el.selected} key={`register-form-language-${i}`}>
                      {el.text}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined" fullWidth={true}>
                <InputLabel htmlFor="outlined-timezone-native-simple">Timezone</InputLabel>
                <Select
                  native
                  value={values.timezone}
                  onChange={handleChange}
                  label="Timezone"
                  inputProps={{
                    name: 'timezone',
                    id: 'outlined-timezone-native-simple'
                  }}
                >
                  {data.registerAgreed.timezones.map((el, i) => (
                    <option value={el.value} selected={el.selected} key={`register-form-tz-${i}`}>
                      {el.text}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* {data.registerAgreed.hiddenInputs.map((el, i) => (
            <input type="hidden" name={el.name} value={el.value} key={`register-hidden-input-${i}`} />
          ))}
          <input type="hidden" name="mode" value="register" />
          <input type="hidden" name="agreed" value="true" />
          <input type="hidden" name="coppa" value="0" />
          <input type="hidden" name="sid" value="327b252b5a3f4a04925e9d7e13645a76" />
          <input type="hidden" name="confirm_id" value="ade91e3ffd7fa5bf5201df649c1dadef" /> */}

          <Button variant="contained" color="primary" size="large" fullWidth={true} name="submit" value="Submit" onClick={handleSubmit} className={[classes.mb3, classes.py15]}>
            Submit
          </Button>
          <Button variant="contained" readOnly fullWidth={true} type="reset" name="reset">
            Reset
          </Button>
        </form>
      </Box>
    </Box>
  )
})

export async function getServerSideProps(context) {
  const {
    req,
    query: { mode, agreed }
  } = context

  const profileMode = (mode || '').toLowerCase()
  let resp = null

  if (profileMode === 'editprofile') {
    resp = await getProfile(req)
  } else if (profileMode === 'viewprofile') {
    resp = await getProfile(req)
  } else if (profileMode === 'register' && agreed === 'true') {
    resp = await getProfileRegisterAgreed(req)
  } else if (profileMode === 'register') {
    resp = await getProfileRegister(req)
  }

  const { data, ...rest } = resp
  context.res.setHeader('set-cookie', rest.cookies || [])

  return {
    props: {
      query: { ...context.query, profileMode },
      data
    }
  }
}

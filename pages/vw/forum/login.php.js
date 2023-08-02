import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Box, Button, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { withStyles } from '@mui/styles'

import { getLogin } from '../../../utils/getters'
import Header from '../../../components/Header'

export default withStyles({
  root: {
    color: '#fff'
  }
})(({ data, classes }) => {
  const router = useRouter()

  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false,
    failed: false
  })

  let failureMessage
  const loginFailed = () => {
    setValues({ ...values, failed: true })
    clearTimeout(failureMessage)
    failureMessage = setTimeout(() => {
      setValues({ ...values, failed: false })
    }, 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('/api/login/', {
      credentials: 'include',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
        // redirect: '/vw/index.php',
        login: 'Log in'
      })
    })
      .then(async (r) => {
        if (r.status === 302) {
          const redirectUrl = (await r.json()).redirect
          console.log('login succeeded:', redirectUrl)
          router.push(redirectUrl)
        } else {
          console.log('login failed')
          loginFailed()
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.base.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Typography variant="h5" paragraph={true}>
          Log in to your account:
        </Typography>
        <Typography paragraph={true}>Please enter your username and password to log in. If you do not have an account, please click on Register in the upper left of the site.</Typography>
        <Box py={2} px={1}>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <FormControl variant="outlined" fullWidth={true} required>
                <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth={true} required value={values.username} onChange={handleChange('username')} />
              </FormControl>
            </Box>

            <Box mb={2}>
              <FormControl variant="outlined" fullWidth={true} required>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
            </Box>

            <Button type="submit" variant="contained" disableElevation>
              Log in
            </Button>

            {values.failed && (
              <Box mt={2} p={1} borderRadius={4} bgcolor="error.dark">
                <Typography className={classes.root}>Login failed</Typography>
              </Box>
            )}
          </form>
        </Box>
      </Box>
    </Box>
  )
})

export async function getServerSideProps(context) {
  const { data, ...rest } = await getLogin(context.req)
  context.res.setHeader('set-cookie', rest.cookies || [])
  if (rest.redirect) {
    context.res.statusCode = 302
    context.res.setHeader('location', rest.redirect)
    context.res.end()
  }

  return {
    props: {
      data
    }
  }
}

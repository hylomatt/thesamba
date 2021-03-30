import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Box, Button, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { getLogin } from '../../../utils/getters'
import HeaderTop from '../../../components/HeaderTop'
import Header from '../../../components/Header'

export default function ForumIndex({ data }) {
  const router = useRouter()

  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false
  })

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
          console.log('login succeeded')
          router.push((await r.json()).redirect)
        } else {
          console.log('login failed')
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
        <title>{data.title}</title>
      </Head>

      <HeaderTop data={data.preHeader} loggedIn={data.loggedIn} />
      <Header data={data.header} items={data.nav} selected="Home" />

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
          </form>
        </Box>
      </Box>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const { cookies, data } = await getLogin(context.req)
  context.res.setHeader('set-cookie', cookies || [])

  return {
    props: {
      data
    }
  }
}

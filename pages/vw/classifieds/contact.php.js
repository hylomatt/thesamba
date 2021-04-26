import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { Box, Typography, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { getClassifiedContact } from '../../../utils/getters'
import Header from '../../../components/Header'

export default withStyles((theme) => ({}))(({ data, classes }) => {
  const initialStateValues = {
    ...data.page.fields,
    ...data.page.hiddenInputs.reduce((acc, elem) => ({ ...acc, [elem.name]: elem.value }), {})
  }

  const [values, setValues] = useState(initialStateValues)
  const [msgSent, setMsgSent] = useState(false)

  const onValueChange = (e, key) => {
    if (key !== 'cc') {
      setValues({ ...values, [key]: e.target.value })
    } else {
      setValues({ ...values, [key]: e.target.checked })
    }
  }

  const onCancel = () => {}

  const onSubmit = async (e) => {
    e.preventDefault()
    const { cc, ...rest } = values
    const submitVals = { ...rest, ...(cc && { cc: 'on' }) }
    await fetch('/api/classifieds-contact/', {
      credentials: 'include',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submitVals)
    })
      .then((r) => setMsgSent(r.ok))
      .catch((e) => {
        console.error(e)
      })
    return false
  }

  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.base.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Box mb={2}>
          <Typography variant="h4">{data.page.title}</Typography>
        </Box>

        <Box mb={2} align="center">
          <Link href={data.page.detail.href}>
            <a>
              <img src={data.page.detail.img.src} />
            </a>
          </Link>
          <Box my={1}>
            <Typography>{data.page.detail.title}</Typography>
          </Box>
          <Box my={1}>
            <Typography>Price: {data.page.detail.price}</Typography>
          </Box>
        </Box>

        {!msgSent
          ? (
            <form onSubmit={onSubmit}>
              <Box mb={2}>
                <TextField variant="outlined" label="Your Name" value={values.name} onChange={(e) => onValueChange(e, 'name')} fullWidth required inputProps={{ maxLength: 30 }} />
              </Box>
              <Box mb={2}>
                <TextField variant="outlined" label="Your E-mail" value={values.email} onChange={(e) => onValueChange(e, 'name')} type="email" fullWidth required inputProps={{ maxLength: 50 }} />
              </Box>
              <Box mb={2}>
                <TextField variant="outlined" label="Your Zip Code or Country" value={values.location} onChange={(e) => onValueChange(e, 'name')} fullWidth inputProps={{ maxLength: 50 }} />
              </Box>
              <Box mb={2}>
                <TextField variant="outlined" label="Message" value={values.desc} onChange={(e) => onValueChange(e, 'desc')} multiline rows={6} fullWidth required inputProps={{ maxLength: 1000 }} />
              </Box>
              <Box mb={2} align="center">
                <FormControlLabel label="Send me a copy of this email" control={<Checkbox onChange={(e) => onValueChange(e, 'cc')} name="cc" checked={!!values.cc} color="primary" />} />
              </Box>

              <Box mt={2}>
                <Grid container justify="space-evenly">
                  <Grid item>
                    <Link href={data.page.detail.href} passHref>
                      <Button component="a" variant="contained" onClick={onCancel} size="large">
                      Cancel
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" type="submit" size="large">
                    Send
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
          )
          : (
            <>
              <Typography variant="h5" align="center">
                <strong>Message sent.</strong>
              </Typography>
              <Box mt={4} align="center">
                <Link href={data.page.detail.href}>
                  <Button component="a" variant="contained" size="large">
                  Return to the ad
                  </Button>
                </Link>
              </Box>
              <Box mt={2} align="center">
                <Link href="/vw/classifieds/">
                  <Button component="a" variant="contained" size="large">
                  Return to the classifieds home page
                  </Button>
                </Link>
              </Box>
            </>
          )}
      </Box>
    </Box>
  )
})

export async function getServerSideProps(context) {
  const { data, ...rest } = await getClassifiedContact(context.req)
  context.res.setHeader('set-cookie', rest.cookies || [])

  return {
    props: {
      data
    }
  }
}

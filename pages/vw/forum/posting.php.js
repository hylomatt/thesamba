import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { Box, Grid, Typography, Hidden, Button, TextField, FormControlLabel, Checkbox } from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'

import { getPosting } from '../../../utils/getters'
import Header from '../../../components/Header'
import Breadcrumb from '../../../components/Breadcrumb'

export default withStyles({
  root: {
    color: 'white'
  },
  postContent: {
    wordWrap: 'break-word'
  },
  pageButton: {
    margin: '0px 4px 8px'
  },
  pageButtonInner: {
    width: '40px',
    textAlign: 'center',
    lineHeight: '40px'
  },
  pageButtonInnerCurrent: {
    backgroundColor: '#fff',
    outline: '1px solid #e7e7e7'
  },
  nameStuff: {
    '& a': {
      display: 'inline-block',
      verticalAlign: 'middle'
    }
  },
  flagLink: {
    height: '15px',
    marginLeft: '4px',

    '& img': {
      height: '15px'
    }
  }
})(({ data, classes }) => {
  const initialStateValues = {
    // ...data.page.fields,
    // ...data.page.hiddenInputs.reduce((acc, elem) => ({ ...acc, [elem.name]: elem.value }), {})
  }

  const [values, setValues] = useState(initialStateValues)

  const onCancel = () => {}

  const onSubmit = async (e) => {
    e.preventDefault()
    // const { cc, ...rest } = values
    // const submitVals = { ...rest, ...(cc && { cc: 'on' }) }
    // await fetch('/api/classifieds-contact/', {
    //   credentials: 'include',
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(submitVals)
    // })
    //   .then((r) => setMsgSent(r.ok))
    //   .catch((e) => {
    //     console.error(e)
    //   })
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

        <form onSubmit={onSubmit}>
          <Box mb={2}>
            <TextField variant="outlined" label="Subject" value={values.subject} onChange={(e) => onValueChange(e, 'subject')} fullWidth required inputProps={{ maxLength: 30 }} />
          </Box>
          <Box mb={2}>
            <TextField variant="outlined" label="Message" value={values.message} onChange={(e) => onValueChange(e, 'message')} multiline rows={12} fullWidth required inputProps={{ maxLength: 1000 }} />
          </Box>
          <Box mb={2} align="center">
            <FormControlLabel label="Send me a copy of this email" control={<Checkbox onChange={(e) => onValueChange(e, 'cc')} name="cc" checked={!!values.cc} color="primary" />} />
          </Box>

          <Box mt={2}>
            <Grid container justify="space-evenly">
              <Grid item>
                <Link href={''} passHref>
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
      </Box>
    </Box>
  )
})

export async function getServerSideProps(context) {
  const { data, ...rest } = await getPosting(context.req)
  context.res.setHeader('set-cookie', rest.cookies || [])

  if (rest.redirect) {
    return {
      redirect: {
        destination: rest.redirect,
        permanent: false
      }
    }
  }

  return {
    props: {
      data
    }
  }
}

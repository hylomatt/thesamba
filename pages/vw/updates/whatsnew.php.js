import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'

import { getWhatsNew } from '../../../utils/getters'
import Header from '../../../components/Header'

export default withStyles({
  events: {
    '& > div': {
      marginBottom: '8px',
      fontSize: 13
    }
  }
})(({ data, classes }) => {
  console.log(data)

  return (
    <Box p={{ xs: 0, md: 1 }}>
      <Head>
        <title>{data.base.title}</title>
      </Head>

      <Header data={data} selected="Home" />

      <Box px={{ xs: 1, md: 0 }} py={1}>
        <Box mb={1}>
          <Typography>What&rsquo;s New</Typography>
        </Box>
        <Accordion square={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Years</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ flexWrap: 'wrap' }}>
            {data.page.years.map((el, idx) => (
              <Link href={el.href} passHref key={`whatsnewyears-${idx}-mobile`}>
                <Typography component="a" className={classes.heading} style={{ display: 'inline-block', padding: '6px 12px' }}>
                  {el.title}
                </Typography>
              </Link>
            ))}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  )
})

export async function getServerSideProps(context) {
  const { data, ...rest } = await getWhatsNew(context.req)
  context.res.setHeader('set-cookie', rest.cookies || [])

  return {
    props: {
      data
    }
  }
}

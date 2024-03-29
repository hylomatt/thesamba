import React from "react";
import Head from "next/head";
import Link from "next/link";

import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { getWhatsNew } from "../../../utils/getters";
import Header from "../../../components/Header";

export default function Main({ data }) {
  console.log(data);

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
            <Typography>Years</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ flexWrap: "wrap" }}>
            {data.page.years.map((el, idx) => (
              <Link
                href={el.href}
                passHref
                key={`whatsnewyears-${idx}-mobile`}
                style={{ display: "inline-block", padding: "6px 12px" }}
              >
                {el.title}
              </Link>
            ))}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const { data, ...rest } = await getWhatsNew(context.req);
  context.res.setHeader("set-cookie", rest.cookies || []);

  return {
    props: {
      data,
    },
  };
}

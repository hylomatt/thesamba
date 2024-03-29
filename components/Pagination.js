import React from "react";
import Link from "next/link";

import { Box, Typography, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Main({ pages }) {
  const theme = useTheme();
  const onlyPages = pages.filter(
    (page) => !["previous", "next"].includes(page.title.toLowerCase())
  );
  const currentPage = onlyPages.findIndex((page) => !page.href.length);
  const prevPage = pages.find(
    (page) => page.title.toLowerCase() === "previous"
  );
  const nextPage = pages.find((page) => page.title.toLowerCase() === "next");
  const totalPages = onlyPages ? onlyPages.slice(-1)[0].title : null;

  return (
    <Box py={2} bgcolor="secondary.light">
      <Grid container justifyContent="space-evenly">
        <Grid item sx={{ width: "100px", textAlign: "center" }}>
          {prevPage ? (
            <Link
              href={prevPage.href}
              sx={{
                display: "block",
                lineHeight: "30px",
                height: "30px",
                background: theme.palette.secondary.main,
                borderRadius: "4px",
              }}
            >
              Previous
            </Link>
          ) : (
            <Box></Box>
          )}
        </Grid>
        <Grid item>
          <Typography
            sx={{ display: "block", lineHeight: "30px", height: "30px" }}
          >
            {currentPage + 1} / {totalPages}
          </Typography>
        </Grid>
        <Grid item sx={{ width: "100px", textAlign: "center" }}>
          {nextPage ? (
            <Link
              href={nextPage.href}
              sx={{
                display: "block",
                lineHeight: "30px",
                height: "30px",
                background: theme.palette.secondary.main,
                borderRadius: "4px",
              }}
            >
              Next
            </Link>
          ) : (
            <Box></Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

import React from "react";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

import { Typography, Divider, Grid } from "@mui/material";
import { styled } from "@mui/system";

export default function Main({ crumbs }) {
  const theme = useTheme();

  const StyledDivider = styled(Divider)(({ theme }) => ({
    background: theme.palette.primary.light,
    margin: "0px 4px",
    height: "12px",
  }));

  return (
    <Grid container alignItems="center">
      {crumbs.map((el, i) => {
        const output = [];

        if (el.href) {
          output.push(
            <Link
              href={el.href}
              key={`breadcrumb-nav-${i}-${el.title}-${el.href}`}
              passHref
              variant="body2"
            >
              {el.title}
            </Link>
          );
        } else {
          output.push(
            <Typography
              component="span"
              variant="body2"
              key={`breadcrumb-nav-${i}-${el.title}`}
            >
              {el.title}
            </Typography>
          );
        }

        if (i < crumbs.length - 1) {
          output.push(
            <StyledDivider
              orientation="vertical"
              key={`breadcrumb-nav-${i}-${el.title}-divider`}
            />
          );
        }

        return output;
      })}
    </Grid>
  );
}

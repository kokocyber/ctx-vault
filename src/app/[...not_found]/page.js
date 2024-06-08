"use client";

import { Button, Grid } from "@mui/material";
import "./page.model.css";
import Link from "next/link";

export default function custom404() {
  return (
    <Grid container justifyContent="center" alignContent="center">
      <Grid item xs={7} textAlign="center" paddingTop="10%">
        <h1 className="title">Bro, what are you searching for?</h1>
      </Grid>
      <Grid item xs={12} />
      <Grid item xs={3} textAlign="center">
        <Link href="/">
          <Button variant="contained">Return</Button>
        </Link>
      </Grid>
    </Grid>
  );
}

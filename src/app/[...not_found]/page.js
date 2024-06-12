"use client";

import { Button, Grid } from "@mui/material";
import "../globals.css";
import "./page.model.css";
import Link from "next/link";

export default function custom404() {
  return (
    <Grid container justifyContent="center" alignContent="center">
      <Grid item xs={8} textAlign="center" paddingTop="15%">
        <h1 className="notFoundTitle">Bro, what are you searching for?</h1>
      </Grid>
      <Grid item xs={12} />
      <Grid item xs={3} textAlign="center">
        <Link href="/">
          <Button size="large" variant="contained" color="secondary">
            Home
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}

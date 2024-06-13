"use client";

import "../globals.css";
import "./page.model.css";
import { Navbar } from "@/app/(components)/Navbar";
import { Grid, Typography } from "@mui/material";
import aboutPic from "../../../public/pic/about_pic.jpg";
import Image from "next/image";

export default function About() {
  return (
    <>
      <Navbar />
      <Grid container justifyContent="center" paddingTop="5%">
        <Grid item xs={5}>
          <Typography variant="h1" className="aboutTitle">
            <span className="highlight">Hey,</span>
          </Typography>
          <Typography variant="h1" className="aboutTitle">
            We&apos;re <span className="highlightOrange">Taha</span> and{" "}
            <span className="highlightOrange">Christopher</span>
          </Typography>
          <Typography variant="h1" className="aboutTitle">
            the CEO&apos;s of Equinox.
          </Typography>
          <Typography variant="h1" className="aboutTitle">
            Don&apos;t have much more to tell ya.
          </Typography>
        </Grid>
        <Grid item xs={5} container justifyContent="center" alignItems="center">
          <Image
            src={aboutPic}
            alt="Logo"
            className="shape"
            style={{ width: "80%", height: "auto" }}
          />
        </Grid>
      </Grid>
    </>
  );
}

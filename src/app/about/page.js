"use client";

import "../globals.css";
import "./page.model.css";
import { Navbar } from "@/app/(components)/Navbar";
import { Grid, Typography } from "@mui/material";
import aboutPic from "../../../public/pic/about_pic.jpg";
import Image from "next/image";
import Link from "next/link";

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
            We&apos;re{" "}
            <Link
              className="noDecoration"
              href="https://ch.linkedin.com/in/taha-ali-00b4621b7?trk=people-guest_people_search-card&original_referer=https://www.linkedin.com/"
            >
              <span className="highlightOrange">Taha</span>
            </Link>{" "}
            and{" "}
            <Link
              className="noDecoration"
              href="https://ch.linkedin.com/in/christopher-scheel-80723122b/en?trk=people-guest_people_search-card&original_referer=https://www.google.com/"
            >
              <span className="highlightOrange">Christopher</span>
            </Link>
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

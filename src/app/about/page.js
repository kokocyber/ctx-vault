"use client";

import "../globals.css";
import "./page.model.css";
import { Navbar } from "@/app/(components)/Navbar";
import { Grid } from "@mui/material";
import aboutPic from "../../../public/pic/about_pic.jpg";
import Image from "next/image";

export default function About() {
  return (
    <>
      <Navbar />
      <Grid container justifyContent="center">
        <Grid item xs={5}>
          <h1 className="aboutTitle">
            <span className="highlight">Hey, </span>
            <br />
            <p />
            We're <span className="highlightOrange">Taha</span> and{" "}
            <span className="highlightOrange">Christopher</span> the CEO's of
            Equinox
            <p />
            Don't have much more to tell ya
          </h1>
        </Grid>
        <Grid item xs={5}>
          <Image
            src={aboutPic}
            style={{ height: "50%", width: "50%" }}
            alt="Logo"
            className="shape"
          />
        </Grid>
      </Grid>
    </>
  );
}

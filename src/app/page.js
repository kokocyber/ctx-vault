"use client"

import { Button, Grid } from "@mui/material";
import Link from "next/link";
import "./page.model.css";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Navbar } from "./(components)/Navbar";
import BrowserTab from "./(components)/BrowserTab";

import { UserContext } from "./(context)/UserContextComponent";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { isUserLoggedIn } = useContext(UserContext)

  const [iconText, setIconText] = useState("Get started")
  const [iconHref, setIconHref] = useState("/login")

  useEffect(() => {
    switch(isUserLoggedIn) {
      case true:
        setIconText("To your vault")
        setIconHref("/vault")
        break;
      case false:
        setIconText("Get started")
        setIconHref("/login")
        break;
      default:
        break;
    }
  }, [isUserLoggedIn])

  return (
    <>
      <BrowserTab title="Equinox - Home" />
      <Navbar />
      <Grid container justifyContent="left" paddingTop={10} paddingLeft={10}>
        <Grid item xs={12}>
          <h1 className="homepageTitle">
            <span className="highlight">Guarding</span> Your Digital Fortress,{" "}
            <br /> One <span className="highlight">Key</span> at a Time.
          </h1>
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={7}>
          <Link href={iconHref}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<RocketLaunchIcon />}
            >
              {iconText}
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

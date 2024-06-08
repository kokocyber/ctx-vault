import { Button, Grid } from "@mui/material";
import Link from "next/link";
import Logo from "../../public/pic/logo.png";
import "./page.model.css";
import Image from "next/image";
import { Navbar } from "./(components)/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Grid container justifyContent="left" paddingTop={10} paddingLeft={10}>
        <Grid item xs={8}>
          <h1 className="homepageTitle">
            Guarding Your Digital Fortress, <br /> One Key at a Time.
          </h1>
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={7}>
          <Link href="/login">
            <Button variant="contained" color="secondary">
              Sign in
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

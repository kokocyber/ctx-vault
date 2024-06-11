import { Button, Grid } from "@mui/material";
import Link from "next/link";
import "./page.model.css";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Navbar } from "./(components)/Navbar";
import BrowserTab from "./(components)/BrowserTab";

export default function Home() {
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
          <Link href="/login">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<RocketLaunchIcon />}
            >
              Get started
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

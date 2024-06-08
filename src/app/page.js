import { Button, Grid } from "@mui/material";
import Link from "next/link";
import Logo from "../../public/pic/logo.png";
import "./page.model.css";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <nav>
        <Grid container alignItems="center" padding={1}>
          <Grid item xs={4}>
            <Image
              src={Logo}
              style={{ height: "20%", width: "20%", objectFit: "cover" }}
              alt="Logo"
            />
          </Grid>
          <Grid item container xs={6}>
            <Grid item xs>
              <Link className="links" href="/">
                Home
              </Link>
            </Grid>
            <Grid item xs>
              <Link className="links" href="/pricing">
                Pricing
              </Link>
            </Grid>
            <Grid item xs>
              <Link className="links" href="/about">
                About
              </Link>
            </Grid>
          </Grid>
          <Grid item xs textAlign="right">
            <Link href="/login">
              <Button variant="outlined">Sign in</Button>
            </Link>
          </Grid>
        </Grid>
      </nav>
      <Grid container justifyContent="left" paddingTop={10} paddingLeft={10}>
        <Grid item xs={7}>
          <h1 className="homepageTitle">
            Guarding Your Digital Fortress, <br /> One Key at a Time.
          </h1>
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={7}>
          <Link href="/login">
            <Button variant="outlined">Sign in</Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

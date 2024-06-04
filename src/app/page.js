import { Button, Grid } from "@mui/material";
import Link from "next/link";
import Logo from "../../public/pic/logo.png";

export default function Home() {
  return (
    <>
      <nav>
        <Grid container>
          <Grid item xs={4}>
            <img src={Logo} alt="Logo" />
          </Grid>
          <Grid item container xs={6}>
            <Grid item xs>
              <Link href="/">Home</Link>
            </Grid>
            <Grid item xs>
              <Link href="/pricing">Pricing</Link>
            </Grid>
            <Grid item xs>
              <Link href="/about">About</Link>
            </Grid>
          </Grid>
          <Grid item xs textAlign="right">
            <Link href="/login">
              <Button variant="contained">Sign in</Button>
            </Link>
          </Grid>
        </Grid>
      </nav>
      <Grid container justifyContent="center" marginTop={10}>
        <Grid item xs={7}>
          <h1>
            Guarding Your Digital Fortress, <br /> One Key at a Time.
          </h1>
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={7}>
          <Link href="/login">
            <Button variant="contained">Sign in</Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

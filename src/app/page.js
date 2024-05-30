import { Grid } from "@mui/material";
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
            <Grid item>
              <Link href="/">Home</Link>
            </Grid>
            <Grid item>
              <Link href="/pricing">Pricing</Link>
            </Grid>
            <Grid item>
              <Link href="/about">About</Link>
            </Grid>
          </Grid>
        </Grid>
      </nav>
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <h1>
            Guarding Your Digital Fortress, <br /> One Key at a Time.
          </h1>
        </Grid>
      </Grid>
    </>
  );
}

import { Button, Grid } from "@mui/material";
import Link from "next/link";
import Logo from "../../../public/pic/logo.png";
import Image from "next/image";

export function Navbar(props) {
    const { children } = props;
    return(
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
            {children}
        </>
    );
}

"use client";

import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import BackgroundImage from "../../../public/pic/mountains.jpg";
import Logo from "../../../public/pic/logo.png";
import Image from "next/image";
import Link from "next/link";
import { login } from "../(util)/api";
import { useRouter } from "next/navigation";

import { UserContext } from "../(context)/UserContextComponent";
import { useContext } from "react";
import { verifyCookie } from "../(util)/api";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        EQUINOX
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

async function retrieveUserData() {
  const response = await verifyCookie()
  if(response.id) {
    return response
  }
}

export default function SignIn() {
 
  const router = useRouter()

  const { isUserLoggedIn, setIsUserLoggedIn, userData } = useContext(UserContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeEmail = (event) => {
    let data = event.target.value;
    setEmail(data);
  };

  const handleChangePassword = (event) => {
    let data = event.target.value;
    setPassword(data);
  };

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await login(email, password)

      if(response.data.session) {
        const currentUserData = await retrieveUserData()
        userData.current = currentUserData
        setIsUserLoggedIn(true)

        router.push("/vault")
      }

      if(response.status === 404) {
        alert("User not found")
      } else if(response.status === 401) {
        alert("Wrong password")
      }

    } catch(e) {
      console.error("Login failed:", e)
    }
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />

      <Grid item xs={false} sm={4} md={6}>
        <img
          src={"/pic/mountains.jpg"}
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
          alt="Background Image"
        />
      </Grid>
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={8} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image width={250} height="auto" src={Logo} alt="Logo" />
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
            <Grid container rowGap={4} justifyContent="center">
              <Grid item xs={10}>
                <TextField
                  label="Email"
                  value={email}
                  onChange={handleChangeEmail}
                  variant="filled"
                  placeholder="example@domain.com"
                  type="email"
                  required
                  fullWidth
                  error={!email}
                />
              </Grid>
              <Grid item xs={10}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel error={!password} required>
                    Password
                  </InputLabel>
                  <FilledInput
                    fullWidth
                    id="filled-adornment-password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="********"
                    error={!password}
                    onChange={handleChangePassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={4} marginRight="2%" justifySelf="center">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={4} justifySelf="center">
                <Link href="/">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Back
                  </Button>
                </Link>
              </Grid>

              <Grid item xs={12} textAlign="center">
                <Link href="/register" variant="body2" textAlign="center">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

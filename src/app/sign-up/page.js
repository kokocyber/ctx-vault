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

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeName = (event) => {
    let data = event.target.value;
    setName(data);
  };

  const handleChangeLastName = (event) => {
    let data = event.target.value;
    setLastName(data);
  };

  const handleChangeEmail = (event) => {
    let data = event.target.value;
    setEmail(data);
  };

  const handleChangePassword = (event) => {
    let data = event.target.value;
    setPassword(data);
  };

  async function loginUser() {
    // Construct the URL with query parameters
    const url = new URL("http://localhost:3000/api/v1/login");
    url.searchParams.append("email", email);
    url.searchParams.append("password", password);

    try {
      // Send the POST request
      const response = await fetch(url, {
        method: "POST",
      });

      // Handle the response
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        const session = data.data;
        localStorage.setItem("session", JSON.stringify(session));
      } else if (response.status === 401) {
        console.log("Wrong password");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error.text);
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
          <Box component="form" onSubmit={loginUser} noValidate sx={{ mt: 1 }}>
            <Grid container rowGap={4} justifyContent="center">
              <Grid item container xs={10} spacing={4}>
                <Grid item xs>
                  <TextField
                    label="First Name"
                    value={name}
                    onChange={handleChangeName}
                    variant="filled"
                    placeholder="Justin"
                    required
                    fullWidth
                    error={!name}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={handleChangeLastName}
                    variant="filled"
                    placeholder="Bieber"
                    required
                    fullWidth
                    error={!lastName}
                  />
                </Grid>
              </Grid>
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
                {/* <Link href="/vault"> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                {/* </Link> */}
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
                <Link href="/sign-in" variant="body2" textAlign="center">
                  {"Already have an account? Sign-in"}
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

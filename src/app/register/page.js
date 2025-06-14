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
import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import BackgroundImage from "../../../public/pic/mountains.jpg";
import Logo from "../../../public/pic/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { register } from "../(util)/api";
import toast from "react-hot-toast";
import { nameSchema, passwordSchema } from "../(util)/validator";
import * as EmailValidator from "email-validator"

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
  const router = useRouter()

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

  const toastValidation = (type, validation) => {
    for(var error of validation) {
      toast.error(`${type}: ${error.message}`)
    }
  }

  const handleRegister = async (event) => {
    event.preventDefault()

    const passwordValidation = passwordSchema.validate(password, { details: true })
    const firstNameValidation = nameSchema.validate(name, { details: true })
    const lastNameValidation = nameSchema.validate(lastName, { details: true })
    const emailValidation = EmailValidator.validate(email)

    if(passwordValidation.length !== 0) {
      toastValidation("Password", passwordValidation)
    } else if(firstNameValidation.length !== 0) {
      toastValidation("First Name", firstNameValidation)
    } else if(lastNameValidation.length !== 0) {
      toastValidation("Last Name", lastNameValidation)
    } else if(!emailValidation) {
      toast.error("Invalid Email")
    } else {
      try {
        const response = await register(email, password, name, lastName)
  
        if(response.status === 201) {
          toast.success("User created, please log in")
          router.push("/login")
        } else if(response.status === 400) {
          toast.error("User already exists")
        } else {
          toast.error("Something went wrong")
        }
  
      } catch(e) {
        console.error("Login failed:", e)
      }
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
          <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
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
                <Link href="/login" variant="body2" textAlign="center">
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

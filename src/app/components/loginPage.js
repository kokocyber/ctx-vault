"use client"

import Image from "next/image";
import { Button, FilledInput, FormControl, Grid, IconButton, InputAdornment, InputLabel, TextField } from "@mui/material";
import Logo from "../../../public/pic/logo.png"
import { useState } from "react";
import Link from "next/link";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginPage() {
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
    }

    const handleChangePassword = (event) => {
        let data = event.target.value;
        setPassword(data);
    }
  return (
    <Grid container className="border" justifyContent="center" alignItems="center">
        <Grid item xs={12} className="border">
            <Image width="auto" height="50px" src={Logo} alt="Logo of company" />
        </Grid>
        <Grid item xs={12} textAlign="center">
            <TextField
            label="Email"
            value={email}
            onChange={handleChangeEmail}
            variant="filled"
            placeholder="example@domain.com"
            type="email"
            required
            error={!email}
            />
        </Grid>
        <Grid item xs={12} textAlign="center">
        <FormControl variant="filled">
          <InputLabel error={!password} required>Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            required
            error={!password}
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
        <Grid item xs={12} textAlign="center">
            <Link href="/vault">
            <Button
            variant="contained"
           >Sign in</Button>
           </Link>
            </Grid>
    </Grid>
  );
}

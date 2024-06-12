"use client";

import {
  Avatar,
  Button,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";

import * as React from "react";
import { Navbar } from "../(components)/Navbar";
import "../globals.css";
import "./page.model.css";
import { useContext } from "react";
import { UserContext } from "../(context)/UserContextComponent";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export default function Account() {
  const { userData } = useContext(UserContext);

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

  const handleChangePassword = (event) => {
    let data = event.target.value;
    setPassword(data);
  };

  return (
    <>
      <Navbar />
      <Grid container justifyContent="center" rowGap={5} columnGap={5}>
        <Grid item xs={12} textAlign="center">
          <h1 className="accountTitle">
            Hey,
            {/* <span className="highlightOrange">{userData.firstName}</span> */}
            <span className="highlightOrange"> {userData.current.id.user.firstName} :)</span>
          </h1>
        </Grid>
        <Grid item xs={4}>
          <TextField
            color="secondary"
            label="First Name"
            value={name}
            onChange={handleChangeName}
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            color="secondary"
            label="Last Name"
            value={lastName}
            onChange={handleChangeLastName}
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={8}>
          <FormControl variant="filled" fullWidth color="secondary">
            <InputLabel>Password</InputLabel>
            <FilledInput
              fullWidth
              id="filled-adornment-password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
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
      </Grid>
      <div style={{
        display: "flex",
        justifyContent: "center",
        padding: 3
      }}>
        <Button>Update</Button>
      </div>
    </>
  );
}

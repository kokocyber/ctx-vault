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
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRef } from "react";

import { sha512, sha512_256 } from "js-sha512";
import { nameSchema, passwordSchema } from "../(util)/validator";
import { updateUser } from "../(util)/api";
import { verifyCookie } from "../(util)/api";

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY

const toastValidation = (type, validation) => {  
  for(var error of validation) {
    toast.error(`${type}: ${error.message}`)
  }
}

export default function Account() {

  const { currentUserData, setCurrentUserData, isUserLoggedIn } = useContext(UserContext);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const nameTitle = useRef("")

  const router = useRouter();

  const [isCooldown, setIsCooldown] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem("currentUserData"));
    setCurrentUserData(data);

    nameTitle.current = data.id.user.firstName

    setLastName(data.id.user.lastName);
    setName(data.id.user.firstName);
  }, []);

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

const handleUpdateAccount = async() => {
  if (!isCooldown) {
    const firstNameValidation = nameSchema.validate(name, { details: true })
    const lastNameValidation = nameSchema.validate(lastName, { details: true })
    const passwordValidation = passwordSchema.validate(password, { details: true })
  
    if(firstNameValidation.length !== 0){
      toastValidation("First Name", firstNameValidation)
    } else if(lastNameValidation.length !== 0) {
      toastValidation("Last Name", lastNameValidation)
    } else if(passwordValidation.length !== 0 && password !== "") {
      toastValidation("Password", passwordValidation)
    } else if(name !== currentUserData.id.user.firstName || lastName !== currentUserData.id.user.lastName || password !== "") {
      try{
        const response = updateUser(currentUserData.id.user.id, name, lastName, password)
        
        const newUserData = await verifyCookie();
        setCurrentUserData(newUserData);
        toast.success("User updated")
        router.push("/logout")
        router.push("/login")
        toast.success("Please login again")
      } catch(e) {
        console.error(e)
        toast.error("Failed updating user")
      }
    } else {
      toast("Fields are the same")
    }
    
    setIsCooldown(true);
    setSecondsLeft(30); 
    const countdownInterval = setInterval(() => {
      setSecondsLeft(prevSeconds => {
        if (prevSeconds === 1) {
          clearInterval(countdownInterval);
          setIsCooldown(false);
        }
        return prevSeconds - 1;
      });
    }, 1000);
  } else {
    toast.error(`Cooldown: ${secondsLeft}s left`)
  }

}

  return (
    <>
      <Navbar />
      <Grid container justifyContent="center" rowGap={5} columnGap={5}>
        <Grid item xs={12} textAlign="center">
          <h1 className="accountTitle">
            {"Hey, "}
            <span className="highlightOrange">{nameTitle.current}</span>
          </h1>
          <h4>Wanna change account information?</h4>
        </Grid>
        <Grid item xs={4}>
          <TextField
            color="secondary"
            label="First Name"
            value={name}
            onChange={handleChangeName}
            variant="filled"
            fullWidth
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
            }}
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
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white" },
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <FormControl variant="filled" fullWidth color="secondary">
            <InputLabel
              htmlFor="filled-adornment-password"
              style={{ color: "white" }}
            >
              Password
            </InputLabel>
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
              inputProps={{
                style: { color: "white" },
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 3,
          marginTop: "5%",
        }}
      >
        <Button size="large" variant="contained" color="secondary" onClick={handleUpdateAccount}>
          Update
        </Button>
      </div>
    </>
  );
}

"use client";

import { Avatar, Grid } from "@mui/material";
import Link from "next/link";
import Logo from "../../../public/pic/logo.png";
import Image from "next/image";
import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import HttpsIcon from "@mui/icons-material/Https";

import { UserContext } from "../(context)/UserContextComponent";
import { useContext } from "react";

export function Navbar(props) {
  const { userData, isUserLoggedIn } = useContext(UserContext)

  var firstName = ":"
  var lastName = ")"

  if(userData.current !== "") {
    firstName = userData.current.id.user.firstName
    lastName = userData.current.id.user.lastName
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { children } = props;

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

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
          {/* <Grid item xs textAlign="right">
                        <Link href="/login">
                            <Button variant="outlined">Sign in</Button>
                        </Link>
                    </Grid> */}
          <Grid item paddingLeft={20} xs={2} textAlign="right">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                display: isUserLoggedIn ? "block": "none"
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    className="accAvatar"
                    sx={{ width: 50, height: 50 }}
                    {...stringAvatar(`${firstName} ${lastName}`)}
                  />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Link href="/account" className="smallLinks">
                <MenuItem onClick={handleClose}>
                  <Grid container alignItems="center">
                    <Grid item xs>
                      <Avatar />
                    </Grid>
                    <Grid item xs>
                      My account
                    </Grid>
                  </Grid>
                </MenuItem>
              </Link>

              <Divider />
              <Link href="/vault" className="smallLinks">
                <MenuItem onClick={handleClose}>
                  {" "}
                  <ListItemIcon>
                    <HttpsIcon />
                  </ListItemIcon>
                  Vault
                </MenuItem>
              </Link>
              <Link href="/logout" className="smallLinks">
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Link>
            </Menu>{" "}
          </Grid>
        </Grid>
      </nav>
      {children}
    </>
  );
}

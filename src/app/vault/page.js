"use client"

import { useContext, useRef, useState } from "react"
import { UserContext } from "../(context)/UserContextComponent"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Box, Container, Divider, Grid } from "@mui/material"

export default function Vault() {
  const router = useRouter()
  const { userData, isUserLoggedIn } = useContext(UserContext)

  const userId = useRef("")

  const [currentCategory, setCurrentCategory] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")

  const [editCategory, setEditCategory] = useState("")
  const [editPassword, setEditPassword] = useState("")

  const [loadedCategories, setLoadedCategories] = useState({})

  useEffect(() => {
    if (!isUserLoggedIn || !userData.current || !userData.current.id) {
      toast.error("You are not logged in");
      router.push("/");
      return;
    }

    userId.current = userData.current.id.user.id;
    setLoadedCategories(userData.current["user data"]);
  }, []);

  return(
    <>
      <Container maxWidth="">
        <Box sx={{
          bgcolor: "white",
          borderRadius: 1
        }}>
          <Grid container padding={1}>
              <Grid item container xs={4}>
                <div>Categories</div>
                <ul>
                  {
                    Object.keys(loadedCategories).map((key) => {
                      return(
                        <div key={key}>{loadedCategories[key].name}</div>
                      )
                    })
                  }
                </ul>
              </Grid>
              <Grid item container xs={8}>
                <div>Passwords</div>
                <ul>
                </ul>
              </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}
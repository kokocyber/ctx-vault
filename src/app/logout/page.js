"use client"

import { useContext, useEffect } from "react";
import { logout } from "../(util)/api";

import { UserContext } from "../(context)/UserContextComponent";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

async function logoutUser() {
    const response = await logout()
    return response
}

export default function Logout() {
    const router = useRouter()

    const { isUserLoggedIn, setIsUserLoggedIn, setCurrentUserData } = useContext(UserContext)

    useEffect(() => {
        if(isUserLoggedIn) {
            logoutUser()
                .then((response) => {
                    toast.success("Successfully logged out")
                    sessionStorage.removeItem("currentUserData")
                    setIsUserLoggedIn(false)
                    setCurrentUserData("")
                    router.push("/")
                })
        } else {
            toast.error("You are not logged in")
            router.push("/")
        }
        
    }, [])

    return(
        <>
            Logging out
        </>
    );
}
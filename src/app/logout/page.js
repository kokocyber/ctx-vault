"use client"

import { useContext, useEffect } from "react";
import { logout } from "../(util)/api";

import { UserContext } from "../(context)/UserContextComponent";
import { useRouter } from "next/navigation";

async function logoutUser() {
    const response = await logout()
    return response
}

export default function Logout() {
    const router = useRouter()

    const { isUserLoggedIn, setIsUserLoggedIn, userData } = useContext(UserContext)

    useEffect(() => {
        if(isUserLoggedIn) {
            logoutUser()
                .then((response) => {
                    setIsUserLoggedIn(false)
                    userData.current = ""
                    router.push("/")
                })
        } else {
            router.push("/")
        }
        
    }, [])

    return(
        <>
            Logging out
        </>
    );
}
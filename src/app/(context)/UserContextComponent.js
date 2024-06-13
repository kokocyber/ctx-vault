"use client";

import { createContext, useEffect, useRef, useState } from "react";
import { verifyCookie } from "../(util)/api";
import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "@emotion/react";

export const UserContext = createContext();

async function verifySession() {
  const response = await verifyCookie();
  if (response.id) {
    return response;
  }
}

export default function UserContextComponent({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUserData, setCurrentUserData] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (document.cookie) {
      verifySession().then((response) => {
        if (response.id) {
          setIsUserLoggedIn(true);
          userData.current = response;
        } else {
          setIsUserLoggedIn(false);
          userData.current = "";
        }
      });
    }
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Load user data from session storage
    const storedUserData = sessionStorage.getItem("currentUserData");
    if (storedUserData) {
      setCurrentUserData(storedUserData);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        currentUserData,
        setCurrentUserData,
      }}
    >
      {isClient && <Toaster position="bottom-left" />}
      {children}
    </UserContext.Provider>
  );
}

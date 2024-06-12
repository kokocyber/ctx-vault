"use client";

import { createContext, useEffect, useRef, useState } from "react";
import { verifyCookie } from "../(util)/api";
import toast, { Toaster } from "react-hot-toast";

export const UserContext = createContext();

async function verifySession() {
  const response = await verifyCookie();
  if (response.id) {
    return response;
  }
}

export default function UserContextComponent({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const userData = useRef("");
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

  return (
    <UserContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn, userData }}>
      {isClient && <Toaster position="bottom-left" />}
      {children}
    </UserContext.Provider>
  );
}

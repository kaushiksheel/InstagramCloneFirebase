import { auth } from "@/Lib/firebase";
import React, { useState, useEffect } from "react";

export const useAuthListener = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem('user',JSON.stringify(user))
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return { user };
};

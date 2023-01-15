import React, { createContext, useEffect, useState } from "react";

export const userContext = createContext({
  user: {},
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user-info") || "{}");
    setUser(userInfo);
  }, []);
  return (
    <>
      <userContext.Provider value={{ user, setUser }}>
        {children}
      </userContext.Provider>
    </>
  );
};

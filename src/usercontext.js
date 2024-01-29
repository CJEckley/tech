// UserContext.js
import React, { createContext, useContext, useState } from "react";
import { MD5 } from "crypto-js";

const UserContext = createContext();

const generateGravatarUrl = (email) => {
  const hash = MD5(email.toLowerCase().trim()).toString();
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    const gravatarUrl = generateGravatarUrl(userData.email);
    setUser({ ...userData, gravatarUrl });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

import React from "react";
import { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  return <div>UserContext</div>;
};

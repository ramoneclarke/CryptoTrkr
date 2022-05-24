import { AssistantSharp } from "@mui/icons-material";
import React from "react";
import { useReducer } from "react";
import { createContext } from "react";

export const UserContext = createContext();

const initialState = {
  // watchList: ["bitcoin", "ethereum"],
  watchList: [],
  portfolio: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addToWatchList":
      return {
        ...state,
        watchList: [...state.watchList, action.payload],
      };
    case "removeFromWatchList":
      return {
        ...state,
        watchList: [
          ...state.watchList.filter((coinId) => coinId !== action.payload),
        ],
      };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatchUserContext] = useReducer(reducer, initialState);
  const { watchList, portfolio } = state;

  return (
    <UserContext.Provider value={{ watchList, portfolio, dispatchUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

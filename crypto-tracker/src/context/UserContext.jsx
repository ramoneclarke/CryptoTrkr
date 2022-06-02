import { AssistantSharp } from "@mui/icons-material";
import React from "react";
import { useReducer } from "react";
import { createContext } from "react";

export const UserContext = createContext();

const initialState = {
  watchList: [], // an array of coin ids
  portfolio: {}, // object containing portfolio item objects -> coinId: {coin id, amount held, transactions}
  // transactions: [], //  an array of objects. One for each transaction.
  // transaction object -> coin id, buy/sell, quantity, currency bought with, date
  transactionHistory: [], // array of transaction objects, appended after each logged transaction
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
    case "addToPortfolio":
      // takes a coin id
      let addToPortfolioObj = state.portfolio;
      addToPortfolioObj[action.payload] = {
        coinId: action.payload,
        holdings: 0,
        transactions: [],
      };

      return {
        ...state,
        portfolio: { ...addToPortfolioObj },
      };
    case "removeFromPortfolio":
      // takes a coin id
      delete state.portfolio[action.payload];
      return {
        ...state,
      };
    case "addTransaction":
      // takes an object containing transaction info

      const transactionObj = {
        coinId: action.payload.id,
        type: action.payload.type,
        quantity: action.payload.quantity,
        currency: action.payload.currency,
        date: action.payload.date,
      };

      let updatedHoldings = state.portfolio[action.payload.id].holdings;
      action.payload.type === "buy"
        ? (updatedHoldings += action.payload.quantity)
        : (updatedHoldings += action.payload.quantity);

      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          [action.payload.id]: {
            coinId: action.payload.id,
            holdings: updatedHoldings,
            transactions: [
              ...state.portfolio[action.payload.id].transactions,
              transactionObj,
            ],
          },
        },
        transactionHistory: [...state.transactionHistory, transactionObj],
      };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatchUserContext] = useReducer(reducer, initialState);
  const { watchList, portfolio, transactionHistory } = state;

  return (
    <UserContext.Provider
      value={{ watchList, portfolio, transactionHistory, dispatchUserContext }}
    >
      {children}
    </UserContext.Provider>
  );
};

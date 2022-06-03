import { AssistantSharp } from "@mui/icons-material";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { DataContext } from "./DataContext";

export const UserContext = createContext();

const initialState = {
  watchList: [], // an array of coin ids
  portfolio: {}, // object containing portfolio item objects -> coinId: {coin id, amount held, transactions}
  portfolioBalance: 0,
  portfolioTransactions: {},
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
      let transactionsArr;
      if (state.portfolioTransactions[action.payload]) {
        transactionsArr = [...state.portfolioTransactions[action.payload]];
      } else {
        transactionsArr = [];
      }

      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          [action.payload]: {
            coinId: action.payload,
            holdings: 0,
          },
        },
        portfolioTransactions: {
          ...state.portfolioTransactions,
          [action.payload]: transactionsArr,
        },
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
          },
        },
        portfolioTransactions: {
          ...state.portfolioTransactions,
          [action.payload.id]: [
            ...state.portfolioTransactions[action.payload.id],
            transactionObj,
          ],
        },
        transactionHistory: [...state.transactionHistory, transactionObj],
      };
    case "updateBalance":
      // takes a number

      return {
        ...state,
        portfolioBalance: action.payload,
      };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatchUserContext] = useReducer(reducer, initialState);
  const {
    watchList,
    portfolio,
    transactionHistory,
    portfolioTransactions,
    portfolioBalance,
  } = state;

  const useDataContext = useContext(DataContext);
  const { coinPrices } = useDataContext;

  // update portfolio balance on every update of portfolio transactions, coin
  // prices and portfolio

  useEffect(() => {
    let updatedPortfolioBalance = 0;
    for (let coin in portfolio) {
      updatedPortfolioBalance += coinPrices[coin] * portfolio[coin].holdings;
    }
    dispatchUserContext({
      type: "updateBalance",
      payload: updatedPortfolioBalance,
    });
  }, [portfolioTransactions, coinPrices, portfolio]);

  return (
    <UserContext.Provider
      value={{
        watchList,
        portfolio,
        transactionHistory,
        portfolioTransactions,
        portfolioBalance,
        dispatchUserContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

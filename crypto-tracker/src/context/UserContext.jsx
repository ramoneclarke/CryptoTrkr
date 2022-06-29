import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { numberFormatter } from "../utils/numberFormatters";
import { DataContext } from "./DataContext";

export const UserContext = createContext();

const initialState = {
  watchList: [], // an array of coin ids
  portfolio: {}, // object containing portfolio item objects -> coinId: {coin id, holdings}
  portfolioBalance: 0,
  portfolioTransactions: {},
  // transactions: [], //  an array of objects. One for each transaction.
  // transaction object -> coin id, buy/sell, quantity, date
  transactionHistory: [], // array of transaction objects, appended after each logged transaction,
  selectedCoin: {},
  alerts: [],
  alertIdCounter: 0,
  activatedAlerts: [],
  unopenedAlerts: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addToWatchList":
      return state.watchList.includes(action.payload)
        ? {
            ...state,
          }
        : {
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
        // currency: action.payload.currency,
        date: action.payload.date,
      };

      let updatedHoldings = state.portfolio[action.payload.id].holdings;
      action.payload.type === "buy"
        ? (updatedHoldings += action.payload.quantity)
        : (updatedHoldings -= action.payload.quantity);

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
        portfolioBalance: numberFormatter(action.payload),
      };
    case "setSelectedCoin":
      // takes an object with 'id' and 'name' keys
      return {
        ...state,
        selectedCoin: action.payload,
      };
    case "addAlert":
      // takes an object with 'coinId', 'coinName', 'coinSymbol', 'targetPrice', 'type' (lower/higher)

      const nextAlertId = state.alertIdCounter + 1;
      const alertObject = Object.assign({ id: nextAlertId }, action.payload);

      return {
        ...state,
        alerts: [...state.alerts, alertObject],
        alertIdCounter: nextAlertId,
      };
    case "removeAlert":
      // takes an alert id
      return {
        ...state,
        alerts: [
          ...state.alerts.filter((alertObj) => alertObj.id !== action.payload),
        ],
      };
    case "addActivatedAlert":
      // takes an alert object when the condition has been met
      return {
        ...state,
        alerts: [
          ...state.alerts.filter(
            (alertObj) => alertObj.id !== action.payload.id
          ),
        ], // remove alert
        activatedAlerts: [action.payload, ...state.activatedAlerts],
      };
    case "removeActivatedAlert":
      // used to dismiss activated alerts. takes an alert id
      return {
        ...state,
        activatedAlerts: [
          ...state.activatedAlerts.filter(
            (alertObj) => alertObj.id !== action.payload
          ),
        ],
      };
    case "addUnopenedAlert":
      return {
        ...state,
        unopenedAlerts: state.unopenedAlerts + 1,
      };
    case "refreshUnopenedAlerts":
      return {
        ...state,
        unopenedAlerts: 0,
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
    selectedCoin,
    alerts,
    activatedAlerts,
    unopenedAlerts,
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

  // scan for alerts
  useEffect(() => {
    alerts.forEach((alert) => {
      switch (alert.type) {
        case "Lower":
          if (coinPrices[alert.coinId] < alert.targetPrice) {
            dispatchUserContext({ type: "addActivatedAlert", payload: alert });
            dispatchUserContext({ type: "addUnopenedAlert", payload: "" });
          }
          return;
        case "Higher":
          if (coinPrices[alert.coinId] > alert.targetPrice) {
            dispatchUserContext({ type: "addActivatedAlert", payload: alert });
            dispatchUserContext({ type: "addUnopenedAlert", payload: "" });
          }
          return;
        default:
      }
    });
  }, [alerts, coinPrices, activatedAlerts]);

  return (
    <UserContext.Provider
      value={{
        watchList,
        portfolio,
        transactionHistory,
        portfolioTransactions,
        portfolioBalance,
        selectedCoin,
        alerts,
        activatedAlerts,
        unopenedAlerts,
        dispatchUserContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

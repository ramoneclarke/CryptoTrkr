import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Market from "./pages/Market";
import Portfolio from "./pages/Portfolio";
import Settings from "./pages/Settings";
import WatchList from "./pages/WatchList";
import Alerts from "./pages/Alerts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Market />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="settings" element={<Settings />} />
          <Route path="watchlist" element={<WatchList />} />
          <Route path="alerts" element={<Alerts />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>Page not found!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);

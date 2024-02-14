import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider.jsx";

import axios from "axios";
import { FiscalYearProvider } from "./providers/FiscalYearProvider.jsx";
import { CategoryProvider } from "./providers/CategoryProvider.jsx";
axios.defaults.baseURL = "http://localhost:8000";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FiscalYearProvider>
          <CategoryProvider>
            <App />
          </CategoryProvider>
        </FiscalYearProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

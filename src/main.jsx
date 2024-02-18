import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider.jsx";

import axios from "axios";
import { FiscalYearProvider } from "./providers/FiscalYearProvider.jsx";
import { CategoryProvider } from "./providers/CategoryProvider.jsx";
import { CompanyProvider } from "./providers/CompanyProvider.jsx";
import { EventProvider } from "./providers/EventProvider.jsx";
import { TaskProvider } from "./providers/TaskProvider.jsx";
import { ToastMessage } from "./helpers/ToastMessage.jsx";

const API_URL = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = API_URL;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastMessage />
      <AuthProvider>
        <FiscalYearProvider>
          <CategoryProvider>
            <CompanyProvider>
              <EventProvider>
                <TaskProvider>
                  <App />
                </TaskProvider>
              </EventProvider>
            </CompanyProvider>
          </CategoryProvider>
        </FiscalYearProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

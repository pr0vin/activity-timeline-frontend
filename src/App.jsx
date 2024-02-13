import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index";
import AuthIndex from "./pages/auth/AuthIndex";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MainIndex from "./pages/MainIndex";
import AdminIndex from "./pages/AdminIndex";
import Dashboard from "./pages/Dashboard";
import EventIndex from "./pages/events/EventIndex";
import FiscalYearIndex from "./pages/fiscal-years/FiscalYearIndex";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={MainIndex}>
          <Route index Component={Index} />
        </Route>

        <Route path="/auth" Component={AuthIndex}>
          <Route path="/auth/login" index Component={Login} />
          <Route path="/auth/register" index Component={Register} />
        </Route>

        <Route path="/dashboard" Component={AdminIndex}>
          <Route index Component={Dashboard} />
          <Route path="/dashboard/events" Component={EventIndex} />

          <Route
            path="/dashboard/settings/fiscal-year"
            Component={FiscalYearIndex}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

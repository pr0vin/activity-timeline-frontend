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
import CategoryIndex from "./pages/categories/CategoryIndex";
import CompanyIndex from "./pages/company/CompanyIndex";
import CompanyList from "./pages/company/CompanyList";
import CompanyForm from "./pages/company/CompanyForm";
import EventForm from "./pages/events/EventForm";
import EventsLists from "./pages/events/EventsLists";
import EventView from "./pages/events/EventView";
import TasksList from "./pages/tasks/TasksList";
import TaskForm from "./pages/tasks/TaskForm";
import ProfileSetting from "./pages/settings/ProfileSetting";
import SettingIndex from "./pages/settings/SettingIndex";
import RequireAuth from "./pages/auth/RequireAuth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={AuthIndex}>
          <Route index Component={Login} />
          {/* <Route path="/auth/register" index Component={Register} /> */}
        </Route>
        <Route path="/" Component={RequireAuth}>
          <Route path="/home" Component={MainIndex}>
            <Route index Component={Index} />
          </Route>
          <Route path="/settings/profile" Component={ProfileSetting} />

          <Route path="/dashboard" Component={AdminIndex}>
            <Route index Component={Dashboard} />
            <Route path="/dashboard/events" Component={EventIndex}>
              <Route index Component={EventsLists} />
              <Route path="/dashboard/events/add" Component={EventForm} />
              <Route path="/dashboard/events/add/:id" Component={EventForm} />
              <Route
                path="/dashboard/events/:eventId/view"
                Component={EventView}
              >
                <Route index Component={TasksList} />
                <Route
                  path="/dashboard/events/:eventId/view/add"
                  Component={TaskForm}
                />
              </Route>
            </Route>

            <Route path="/dashboard/settings/:id" Component={CompanyForm} />

            <Route
              path="/dashboard/config/fiscal-year"
              Component={FiscalYearIndex}
            />
            <Route
              path="/dashboard/config/fiscal-year/:id"
              Component={FiscalYearIndex}
            />

            <Route
              path="/dashboard/config/categories"
              Component={CategoryIndex}
            />
            <Route
              path="/dashboard/config/categories/:id"
              Component={CategoryIndex}
            />

            <Route path="/dashboard/config/companies" Component={CompanyIndex}>
              <Route index Component={CompanyList} />
              <Route
                path="/dashboard/config/companies/add"
                Component={CompanyForm}
              />
              <Route
                path="/dashboard/config/companies/add/:id"
                Component={CompanyForm}
              />
            </Route>

            <Route path="/dashboard/config/company-user" Component={Register} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

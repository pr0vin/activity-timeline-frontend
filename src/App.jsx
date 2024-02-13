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

function App() {
  const [count, setCount] = useState(0);

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
      </Routes>
    </>
  );
}

export default App;

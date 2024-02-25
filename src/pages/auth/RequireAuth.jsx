import React, { useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { Outlet, useNavigate } from "react-router-dom";

function RequireAuth() {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  return <Outlet />;
}

export default RequireAuth;

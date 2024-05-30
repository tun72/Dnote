import React, { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function ProtectRoute({ children }) {
  const navigate = useNavigate();
  const { token } = useUser();

  useEffect(() => {
    if (!token) return navigate("/login");
  }, [token, navigate]);
  return children;
}

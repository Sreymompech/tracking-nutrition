import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Protected = ({ children }) => {
  const { googleUser } = UserAuth();
  if (!googleUser) {
    return <Navigate to="/" />;
  }
  return children;
};

export default Protected;

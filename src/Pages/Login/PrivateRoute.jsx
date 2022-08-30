import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
//import { AuthContext } from "../../context/AuthContext";

export const PrivateRoute = () => {
  //const { token } = useContext(AuthContext);
  const token = localStorage.getItem("alankartoken");

  console.log("alankartoken Private Route", token);

  return token ? <Outlet /> : <Navigate to="/" />;
};

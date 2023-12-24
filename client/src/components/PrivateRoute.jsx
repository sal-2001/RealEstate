import React from "react";
import { useSelector } from "react-redux";
//for navigating to the children
import { Outlet, Navigate } from "react-router-dom";
export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  //   console.log(currentUser);
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}

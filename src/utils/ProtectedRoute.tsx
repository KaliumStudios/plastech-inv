import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  condition: boolean;
  redirectPath: string;
};
export const ProtectedRoute = ({
  condition,
  redirectPath,
}: ProtectedRouteProps) => {
  if (!condition) {
    return <Navigate to={redirectPath} replace={false} />;
  }

  return <Outlet />;
};

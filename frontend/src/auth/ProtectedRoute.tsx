import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  // Wait for Auth0 to finish checking session
  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  // If user not authenticated, redirect to home
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, show the protected content
  return <Outlet />;
};

export default ProtectedRoute;

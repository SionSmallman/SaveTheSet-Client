// Component used to protect routes from unauthed users
// To protect a route, wrap the element in ProtectedRoute component

import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  
  // Get current auth context
  const { state } = useAuthContext();
  const user = state.user;

  // If user exists in context, continue to protected route
  // If user is null, redirect to home page
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

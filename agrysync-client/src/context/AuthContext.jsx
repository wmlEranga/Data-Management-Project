// AuthContext.js
import React, { createContext, useContext, useState } from "react";

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component to provide authentication state and functions
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Implement login logic here
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Implement logout logic here
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

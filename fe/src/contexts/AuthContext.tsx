import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  LoginFormValues,
  APIError,
  AuthContextProps,
  AuthProviderProps,
} from "../utils/type";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<APIError | null>(null);
  const navigate = useNavigate();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const login = useCallback(async (values: LoginFormValues) => {
    try {
      setIsLoading(true);
      const response = await fetch("https://w18.eswe.dev/v1/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();

        const userData = {
          id: data.userId,
          username: data.username,
          roleId: data.roleId,
        };
        
        setUser(userData);
        // console.log("Received user data:", userData);
        sessionStorage.setItem("user", JSON.stringify(userData));
        setIsAuthenticated(true);
        setIsLoading(false);
        return data;
      } else {
        const err: APIError = await response.json();
        setIsLoading(false);
        throw err;
      }
    } catch (error: unknown) {
      setIsLoading(false);
      throw error;
    }
  }, []);

  const checkAuthenticationFromSession = () => {
    const userData = sessionStorage.getItem("user");
    setIsAuthenticated(!!userData);
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuthenticationFromSession();
  }, []);

  useEffect(() => {
    // console.log("Auth status changed. Is loading:", isLoading, "Is authenticated:", isAuthenticated);
  }, [isAuthenticated, isLoading]);

  const logout = useCallback(() => {
    // console.log('Logging out...'); 
    fetch("https://w18.eswe.dev/v1/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
    sessionStorage.removeItem("user"); // Hapus dari sessionStorage
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

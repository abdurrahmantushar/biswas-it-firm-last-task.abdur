import { createContext, useEffect, useState } from "react";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../services/authService";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const data = await loginUser({
      email,
      password,
    });

    setUser(data.user);

    return data.user;
  };

  const register = async (userData) => {
    const data = await registerUser(userData);
    return data.user;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
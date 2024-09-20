"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  const login = (username: string) => {
    setUsername(username);
    // You can store the username in localStorage or a cookie if you want it to persist
    localStorage.setItem("username", username); // Optional: Store in localStorage
  };

  const logout = () => {
    setUsername(null);
    localStorage.removeItem("username"); // Remove from localStorage
    router.push("/login"); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

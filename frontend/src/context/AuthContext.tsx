"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  method: "google" | "password";
  role?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<boolean>;
  signUpWithEmail: (name: string, email: string, password: string) => Promise<boolean>;
  loginWithGoogle: (customEmail?: string) => Promise<boolean>;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem("loanpulse_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    } else {
      // Default demo logged in user for seamless initial experience
      const defaultUser: UserProfile = {
        name: "Alex Morgan",
        email: "alex.morgan@gmail.com",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
        method: "google",
        role: "Senior Risk Underwriter"
      };
      setUser(defaultUser);
      localStorage.setItem("loanpulse_user", JSON.stringify(defaultUser));
    }
    setLoading(false);
  }, []);

  const saveSession = (newUser: UserProfile) => {
    setUser(newUser);
    localStorage.setItem("loanpulse_user", JSON.stringify(newUser));
  };

  const updateProfile = (updatedData: Partial<UserProfile>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedData };
    saveSession(updatedUser);
  };

  const loginWithEmail = async (email: string, password: string): Promise<boolean> => {
    if (!email || !password) return false;
    
    // Simulate authentication process
    const nameFromEmail = email.split("@")[0];
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    
    const newUser: UserProfile = {
      name: formattedName,
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
      method: "password",
      role: "Credit Officer"
    };

    saveSession(newUser);
    return true;
  };

  const signUpWithEmail = async (name: string, email: string, password: string): Promise<boolean> => {
    if (!name || !email || !password) return false;

    const newUser: UserProfile = {
      name: name,
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
      method: "password",
      role: "Underwriter"
    };

    saveSession(newUser);
    return true;
  };

  const loginWithGoogle = async (customEmail?: string): Promise<boolean> => {
    const selectedEmail = customEmail || "analyst.user@gmail.com";
    const nameFromEmail = selectedEmail.split("@")[0].replace(".", " ");
    const formattedName = nameFromEmail.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

    const newUser: UserProfile = {
      name: formattedName || "Google User",
      email: selectedEmail,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
      method: "google",
      role: "Senior Risk Underwriter"
    };

    saveSession(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loanpulse_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithEmail,
        signUpWithEmail,
        loginWithGoogle,
        updateProfile,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

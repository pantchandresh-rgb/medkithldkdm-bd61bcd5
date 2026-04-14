import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface UserProfile {
  name: string;
  phone: string;
  address?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (profile: UserProfile) => void;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
  getUserBookings: () => import("@/lib/bookings").BookingEntry[];
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "medkit-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (profile: UserProfile) => setUser(profile);
  const logout = () => setUser(null);
  const updateProfile = (profile: UserProfile) => setUser(profile);

  const getUserBookings = () => {
    if (!user) return [];
    const { getBookings } = require("@/lib/bookings");
    return (getBookings() as import("@/lib/bookings").BookingEntry[]).filter(
      (b) => b.phone === user.phone
    );
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, updateProfile, getUserBookings }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

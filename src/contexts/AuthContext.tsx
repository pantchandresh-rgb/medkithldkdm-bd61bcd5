import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { getBookings, type BookingEntry } from "@/lib/bookings";

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
  getUserBookings: () => BookingEntry[];
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

  const login = useCallback((profile: UserProfile) => setUser(profile), []);
  const logout = useCallback(() => setUser(null), []);
  const updateProfile = useCallback((profile: UserProfile) => setUser(profile), []);

  const getUserBookings = useCallback(() => {
    if (!user) return [];
    return getBookings().filter((b) => b.phone === user.phone);
  }, [user]);

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

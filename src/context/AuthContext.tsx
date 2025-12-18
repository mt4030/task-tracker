import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
// Types
interface User {
  id: number;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuth: boolean;
  login: (email: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Local storage keys
const TOKEN_KEY = "access_token";
const USER_KEY = "auth_user";

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = (email: string) => {
    const fakeToken = `FAKE_TOKEN_${Date.now()}`;
    const fakeUser: User = { id: Date.now(), email };

    localStorage.setItem(TOKEN_KEY, fakeToken);
    localStorage.setItem(USER_KEY, JSON.stringify(fakeUser));
    localStorage.setItem("first_visit_choice", "auth");

    setToken(fakeToken);
    setUser(fakeUser);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem("first_visit_choice");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuth: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

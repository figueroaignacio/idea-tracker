import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { type User } from "~/modules/user/lib/definitions";
import {
  fetchUser,
  loginWithGitHub,
  loginWithGoogle,
  logout,
} from "../api/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGitHub: () => void;
  loginWithGoogle: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeUser = async () => {
      setLoading(true);
      const user = await fetchUser();
      setUser(user);
      setLoading(false);
    };

    initializeUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGitHub,
        loginWithGoogle,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside of an AuthProvider");
  }
  return context;
};

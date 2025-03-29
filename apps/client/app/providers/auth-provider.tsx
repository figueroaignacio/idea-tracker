import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "~/context/auth-context";
import { type User } from "~/modules/user/lib/definitions";
import {
  fetchUser,
  loginWithGitHub,
  loginWithGoogle,
  logout,
} from "../modules/auth/api/auth";

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
    <AuthContext
      value={{
        user,
        loading,
        loginWithGitHub,
        loginWithGoogle,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext>
  );
};

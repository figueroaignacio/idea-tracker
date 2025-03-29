import { createContext } from "react";
import { type User } from "~/modules/user/lib/definitions";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGitHub: () => void;
  loginWithGoogle: () => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

import { use } from 'react';
import AuthContext, { type AuthContextType } from '../context/auth-context';

export const useAuth = (): AuthContextType => {
  const context = use(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

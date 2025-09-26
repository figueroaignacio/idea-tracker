import React, { useEffect, useState } from 'react';
import { config } from '../../../config/config';
import { type User } from '../../user/types';
import AuthContext, { type AuthContextType } from '../context/auth-context';
import { getMe, refreshAccessToken } from '../services/auth-services';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const data = await getMe();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        await refreshAccessToken();
        await fetchUser();
      } catch {
        console.log('No hay sesión válida o refresh token expirado');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login: AuthContextType['login'] = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${config.apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error('Login failed');
      await fetchUser();
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup: AuthContextType['signup'] = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    setLoading(true);
    try {
      const res = await fetch(`${config.apiUrl}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      if (!res.ok) throw new Error('Signup failed');
      await fetchUser();
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout: AuthContextType['logout'] = async () => {
    setLoading(true);
    try {
      await fetch(`${config.apiUrl}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext value={{ user, setUser, loading, login, signup, logout }}>{children}</AuthContext>
  );
};

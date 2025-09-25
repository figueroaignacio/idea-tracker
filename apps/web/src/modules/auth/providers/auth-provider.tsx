import React, { useEffect, useState } from 'react';
import { config } from '../../../config/config';
import { type User } from '../../user/types';
import AuthContext, { type AuthContextType } from '../context/auth-context';
import { getMe } from '../services/services';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const data = await getMe();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login: AuthContextType['login'] = async (email, password) => {
    const res = await fetch(`${config.apiUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    await fetchUser();
  };

  const signup: AuthContextType['signup'] = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    const res = await fetch(`${config.apiUrl}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ firstName, lastName, email, password }),
    });
    if (!res.ok) throw new Error('Signup failed');
    await fetchUser();
  };

  const logout: AuthContextType['logout'] = async () => {
    await fetch(`${config.apiUrl}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

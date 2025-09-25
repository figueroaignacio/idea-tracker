import { config } from '../../../config/config';

export const refreshAccessToken = async () => {
  const res = await fetch(`${config.apiUrl}/api/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Cannot refresh token');
  const data = await res.json();
  return data.accessToken;
};

export const getMe = async () => {
  const token = await refreshAccessToken();
  const res = await fetch(`${config.apiUrl}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
};

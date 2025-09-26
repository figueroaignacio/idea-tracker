import { config } from '../../../config/config';

let accessToken: string | null = null;

export const refreshAccessToken = async () => {
  const res = await fetch(`${config.apiUrl}/api/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Cannot refresh token');
  const data = await res.json();
  accessToken = data.accessToken;
  return accessToken;
};

export const getMe = async () => {
  if (!accessToken) {
    accessToken = await refreshAccessToken();
  }

  const res = await fetch(`${config.apiUrl}/api/users/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: 'include',
  });

  if (res.status === 401) {
    accessToken = await refreshAccessToken();
    const retry = await fetch(`${config.apiUrl}/api/users/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      credentials: 'include',
    });
    if (!retry.ok) throw new Error('Unauthorized');
    return retry.json();
  }

  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
};

export const clearAccessToken = (): void => {
  accessToken = null;
};

export const hasValidToken = (): boolean => {
  return accessToken !== null;
};

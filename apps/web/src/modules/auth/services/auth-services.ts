import { config } from '../../../config/config';

const TOKEN_KEY = 'accessToken';

// Guardar y recuperar del sessionStorage
const getStoredToken = (): string | null => {
  return sessionStorage.getItem(TOKEN_KEY);
};

const setStoredToken = (token: string | null) => {
  if (token) {
    sessionStorage.setItem(TOKEN_KEY, token);
  } else {
    sessionStorage.removeItem(TOKEN_KEY);
  }
};

let accessToken: string | null = getStoredToken();

export const setAccessToken = (token: string | null) => {
  accessToken = token;
  setStoredToken(token);
};

export const refreshAccessToken = async () => {
  const res = await fetch(`${config.apiUrl}/api/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Cannot refresh token');
  const data = await res.json();
  setAccessToken(data.accessToken);
  return data.accessToken;
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
  setAccessToken(null);
};

export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {},
): Promise<Response> => {
  if (!accessToken) {
    await refreshAccessToken();
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  let res = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (res.status === 401) {
    await refreshAccessToken();
    res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
    });
  }

  return res;
};

import { authEndpoints } from "./endpoints";

export const fetchUser = async () => {
  try {
    const response = await fetch(authEndpoints.profile, {
      credentials: "include",
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const loginWithGitHub = () => {
  window.location.href = authEndpoints.providers.github;
};

export const loginWithGoogle = () => {
  window.location.href = authEndpoints.providers.google;
};

export const logout = async () => {
  try {
    await fetch(authEndpoints.logout, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

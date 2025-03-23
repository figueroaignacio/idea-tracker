import { API } from "~/lib/api";

export const authEndpoints = {
  providers: {
    github: `${API}/auth/github`,
    google: `${API}/auth/google`,
  },
  logout: `${API}/auth/logout`,
  profile: `${API}/auth/profile`,
};

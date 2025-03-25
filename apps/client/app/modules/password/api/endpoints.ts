import { API } from "~/lib/api";

export const passwordEndpoints = {
  generatePassword: (length: number) => `${API}/generate?length=${length}`,
};

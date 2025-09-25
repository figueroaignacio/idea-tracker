export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  refresh_token: string | null;
};

export type NewUser = Omit<User, 'id'>;

export interface PasswordCreateDTO {
  provider: string;
  title: string;
  username: string;
  password: string;
  website?: string;
  notes?: string;
  userId: number;
}

export interface PasswordUpdateDTO {
  title?: string;
  username?: string;
  password?: string;
  website?: string;
  notes?: string;
  isFavorite?: boolean;
}

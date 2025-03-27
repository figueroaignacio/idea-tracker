export interface PasswordCreateDTO {
  platform: string;
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

export type User = {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  created_at: string;
};

export type Credentials = {
  username: string;
  password: string;
};

export type RegistrationInfo = {
  full_name: string;
  username: string;
  password: string;
  password_confirmation: string;
};

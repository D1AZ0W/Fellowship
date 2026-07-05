export type User = {
  address: { city: string; street: string };
  id: number;
  email: string;
  username: string;
  password: string;
  name: { firstname: string; lastname: string };
  phone: string;
};

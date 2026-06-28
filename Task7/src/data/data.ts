export interface User {
  username: string;
  email: string;
  address: string;
  phone: string;
}
const USER_KEY = "user";

export function setUser(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): User | null {
  const data = localStorage.getItem(USER_KEY);
  if (!data) return null;

  try {
    return JSON.parse(data) as User;
  } catch {
    return null;
  }
}

export function removeUser(): void {
  localStorage.removeItem(USER_KEY);
}

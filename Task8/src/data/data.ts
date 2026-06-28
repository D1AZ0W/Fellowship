export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: { city: string; street: string };
  phone: string;
  website: string;
  company: { name: string };
};

interface TypedResponse<T> extends Response {
  json(): Promise<T>;
}
declare function fetch<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<TypedResponse<T>>;

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const res = await fetch<User[]>(
      "https://jsonplaceholder.typicode.com/users",
    );
    if (res.status === 200) {
      return await res.json();
    }
    return [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

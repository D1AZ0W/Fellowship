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

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface TypedResponse<T> extends Response {
  json(): Promise<T>;
}
declare function fetch<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<TypedResponse<T>>;

const url = "https://jsonplaceholder.typicode.com";
export const fetchData = async <T>(specifier: string): Promise<T> => {
  const res = await fetch<T>(url + "/" + specifier);
  if (!res.ok) {
    throw new Error("Request failed: " + res.status);
  }
  return res.json();
};

export const fetchUsers = async (): Promise<User[]> => {
  return fetchData<User[]>(`users`);
};

export const fetchPosts = async (page = 1, limit = 8): Promise<Post[]> => {
  return fetchData<Post[]>(`posts?_page=${page}&_limit=${limit}`);
};

export const fetchAllPosts = async (): Promise<Post[]> => {
  return fetchData<Post[]>(`posts`);
};

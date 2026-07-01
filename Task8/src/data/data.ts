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

export const fetchPosts = async (page = 1): Promise<Post[]> => {
  return fetchData<Post[]>(`posts?_page=${page}&_limit=8`);
};

export const searchPosts = (search: string, userId?: number) => {
  const params = new URLSearchParams();

  if (search) params.append("q", search);
  if (userId) params.append("userId", userId.toString());

  return fetchData<Post[]>(`posts?${params.toString()}`);
};

export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  const res = await fetch(`${url}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  if (!res.ok) {
    throw new Error("Failed to create post");
  }

  return res.json() as Promise<Post>;
};

export const updatePost = async (post: Post): Promise<Post> => {
  const res = await fetch(`${url}/posts/${post.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!res.ok) {
    throw new Error("Failed to update post");
  }

  return res.json() as Promise<Post>;
};

export const deletePost = async (id: number): Promise<void> => {
  const res = await fetch(`${url}/posts/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete post");
  }
};

export const fetchIndv = async (id: number): Promise<User> => {
  return fetchData<User>(`users/${id}`);
};

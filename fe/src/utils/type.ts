import { ReactNode } from "react";

export interface User {
  id: number;
  username: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

export interface Friendship {
  id: string;
  requesteeId: number;
  requesterId: number;
  Requester: { username: string };
  Requestee: { username: string; id: number };
  status: string;
}

export interface FriendshipListProps {
  data: Friendship[];
  currentUser?: User | null;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface APIError {
  status: number;
  message: string;
}

export interface FetchResult<T> {
  data: T | null;
  total: number;
  error: APIError | null | unknown;
  isLoading: boolean;
}

export interface FriendshipContextProps {
  friendships: ExtendedFetchResult<Friendship[]>;
  fetchFriendships: (page?: number, pageSize?: number) => Promise<any>;
  fetchData: (
    url: string,
    options?: RequestInit
  ) => Promise<ExtendedFetchResult<Friendship[]>>;
}

export interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (values: LoginFormValues) => void;
  logout: () => void;
  clearError: () => void;
  error: APIError | null;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface ResetPasswordFormValues {
  email: string;
}

export interface NewPasswordFormValues {
  newPassword: string;
}

export interface ExtendedFetchResult<T> extends FetchResult<T> {
  currentPage?: number;
  totalPages?: number;
}


export interface Project {
  id: string;
  name: string;
  description: string;
  managerId: string;
  createdAt: string;
  updatedAt: string;
  manager: {
    username: string;
  };
}

export interface Task  {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  assignedTo: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
  assignee: {
      username: string;
  };
  project: {
    name: string;
};
}

export interface ProjectFormValues {
  name: string;
  description: string;
}

import axios from 'axios';
import { API_BASE_URL } from '../../constants';

// 1. User Interface
export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

const USER_URL = `${API_BASE_URL}/users`;

// 2. Get all users
export const getUsers = async (): Promise<User[]> => {
  const res = await axios.get(USER_URL);
  return res.data;
};

// 3. Create user (exclude id when creating)
export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const res = await axios.post(USER_URL, user);
  return res.data;
};

// 4. Update user (id required)
export const editUser = async (user: User): Promise<User> => {
  const res = await axios.put(`${USER_URL}/${user.id}`, user);
  return res.data;
};

// 5. Delete user
export const deleteUser = async (id: number): Promise<number> => {
  await axios.delete(`${USER_URL}/${id}`);
  return id;
};

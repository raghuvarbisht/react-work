// src/features/cart/cartAPI.ts

import axios from 'axios';
import { API_BASE_URL } from '../../constants';

const CART_URL = `${API_BASE_URL}/cart`;

export const getCart = async () => {
  const response = await axios.get(CART_URL);
  return response.data;
};

export const addCartItem = async (item: {
  id: number;
  name: string;
  price: number;
  quantity: number;
}) => {
  const response = await axios.post(CART_URL, item);
  return response.data;
};

export const updateCartItem = async (item: {
  id: number;
  name?: string;
  price?: number;
  quantity: number;
}) => {
  const response = await axios.put(`${CART_URL}/${item.id}`, item);
  return response.data;
};

export const removeCartItem = async (id: number) => {
  await axios.delete(`${CART_URL}/${id}`);
  return id;
};

// ✅ New: remove all items from cart
export const removeAllCartItems = async () => {
  await axios.delete(`${CART_URL}/clear`);
  return true;
};

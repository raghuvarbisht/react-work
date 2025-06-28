import axios from 'axios';
import { API_BASE_URL } from '../../constants';

const PRODUCT_URL = `${API_BASE_URL}/products`;

export const getProducts = async () => {
  const res = await axios.get(PRODUCT_URL);
  return res.data;
};

export const createProduct = async (product: { name: string; price: number }) => {
  const res = await axios.post(PRODUCT_URL, product);
  return res.data;
};

export const editProduct = async (product: { id: number; name: string; price: number }) => {
  const res = await axios.put(`${PRODUCT_URL}/${product.id}`, product);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  await axios.delete(`${PRODUCT_URL}/${id}`);
  return id;
};

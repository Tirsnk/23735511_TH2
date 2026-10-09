import { apiClient } from '@services/apiClient';

export interface ProductItem {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const fetchProducts = async (): Promise<ProductItem[]> => {
  const response = await apiClient.get<ProductItem[]>('/products?limit=12');
  return response.data;
};
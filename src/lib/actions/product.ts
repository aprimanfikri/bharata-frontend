"use server";

import { getProductRequest } from "../api/product";

export const getProductAction = async (token: string) => {
  const data = await getProductRequest(token);
  return data.data.products;
};

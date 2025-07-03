import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProductRequest = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/product`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

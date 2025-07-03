import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getRackRequest = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/rack`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

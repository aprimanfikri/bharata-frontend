import axios from "axios";
import { LoginFormSchema } from "../validator";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginRequest = async (credentials: LoginFormSchema) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, credentials);
  return res.data;
};

export const getProfileRequest = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/auth`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

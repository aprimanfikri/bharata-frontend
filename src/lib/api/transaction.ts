import axios from "axios";
import { TransactionFormSchema } from "../validator";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createTransactionRequest = async (
  token: string,
  values: TransactionFormSchema
) => {
  const response = await axios.post(`${BASE_URL}/transaction`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  revalidatePath("/product");
  return response.data;
};

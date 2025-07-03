"use server";

import { createTransactionRequest } from "../api/transaction";
import { TransactionFormSchema } from "../validator";

export const createTransactionAction = async (
  token: string,
  values: TransactionFormSchema
) => {
  const data = await createTransactionRequest(token, values);
  return data;
};

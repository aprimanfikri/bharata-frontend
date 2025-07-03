import { z } from "zod";

export const loginFormSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(50, {
      message: "Username must be at most 50 characters long",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    })
    .max(100, {
      message: "Password must be at most 100 characters long",
    }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const transactionFormSchema = z.object({
  productId: z.string({
    required_error: "Name must be not empty",
  }),
  type: z.enum(["IN", "OUT"], {
    required_error: "Type must be not empty",
  }),
  quantity: z.coerce
    .number({
      required_error: "Quantity must be not empty",
    })
    .int({
      message: "Quantity must be an integer",
    }),
});

export type TransactionFormSchema = z.infer<typeof transactionFormSchema>;

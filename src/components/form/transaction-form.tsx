"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ButtonSubmit } from "@/components/button-submit";
import { TransactionFormSchema, transactionFormSchema } from "@/lib/validator";
import { createTransactionAction } from "@/lib/actions/transaction";

export const TransactionForm = ({
  session,
  products,
  onCloseDialog,
}: {
  session: Session;
  products: Product[];
  onCloseDialog: () => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TransactionFormSchema>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      productId: "",
      type: undefined,
      quantity: 0,
    },
  });
  const onSubmit = (values: TransactionFormSchema) => {
    startTransition(async () => {
      const response = await createTransactionAction(
        session.token as string,
        values
      );

      console.log(response);

      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        setTimeout(() => {
          onCloseDialog();
        }, 500);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products
                        .filter((prod) => prod.id !== "")
                        .map((prod) => (
                          <SelectItem key={prod.id} value={prod.id}>
                            {prod.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Type Transaction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IN">In</SelectItem>
                      <SelectItem value="OUT">Out</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Input quantity"
                    {...field}
                    disabled={isPending}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ButtonSubmit
            isPending={isPending}
            text="Submit"
            type="submit"
            classNames="w-full"
          />
        </form>
      </Form>
    </div>
  );
};

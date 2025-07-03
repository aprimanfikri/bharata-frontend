"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input";
import { ButtonSubmit } from "@/components/button-submit";
import { LoginFormSchema, loginFormSchema } from "@/lib/validator";
import { loginAction } from "@/lib/actions/auth";

export const AuthForm = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = (values: LoginFormSchema) => {
    startTransition(async () => {
      const response = await loginAction(values);

      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        router.push("/");
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Username"
                    {...field}
                    disabled={isPending}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Password"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ButtonSubmit
            isPending={isPending}
            text="Sign In"
            type="submit"
            classNames="w-full"
          />
        </form>
      </Form>
    </div>
  );
};

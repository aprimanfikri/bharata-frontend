"use client";

import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

type ButtonSize = "default" | "sm" | "lg" | "icon";

type ButtonType = "submit" | "button" | "reset";

interface ButtonSubmitProps {
  isPending: boolean;
  text: string;
  type: ButtonType;
  classNames?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
}

export const ButtonSubmit = ({
  isPending,
  text,
  classNames,
  type,
  variant,
  size,
  onClick,
}: ButtonSubmitProps) => {
  return (
    <Button
      type={type ?? "button"}
      variant={variant ?? "default"}
      size={size ?? "default"}
      className={cn("cursor-pointer", classNames)}
      disabled={isPending}
      onClick={onClick}
    >
      {isPending ? (
        <>
          <Loader className="animate-spin" /> Loading
        </>
      ) : (
        text
      )}
    </Button>
  );
};

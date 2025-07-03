import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sanitizeSession = (session: Session) => {
  return {
    isLoggedIn: session.isLoggedIn,
    id: session.id,
    username: session.username,
    role: session.role,
    token: session.token,
  };
};

import { SessionOptions } from "iron-session";

export const defaultSession: Session = {
  id: undefined,
  username: undefined,
  role: undefined,
  isLoggedIn: false,
  token: undefined,
};

export const sessionOptions: SessionOptions = {
  password: process.env.AUTH_SECRET!,
  cookieName: "this_is_session",
  ttl: 60 * 60 * 24 * 3,
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { defaultSession, sessionOptions } from "../session";
import { getProfileRequest, loginRequest } from "../api/auth";
import { loginFormSchema, LoginFormSchema } from "../validator";
import { errorHandler } from "../error-handlre";
import { sanitizeSession } from "../utils";

export const getSession = async () => {
  const cookieStore = await cookies();

  const session = await getIronSession<Session>(cookieStore, sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.id = defaultSession.id;
    session.username = defaultSession.username;
    session.role = defaultSession.role;
    session.token = defaultSession.token;
  }

  if (!session.token) {
    Object.assign(session, defaultSession);
    return session;
  }

  const profile = await getProfileRequest(session.token);

  session.isLoggedIn = true;
  session.id = profile.id;
  session.username = profile.username;
  session.role = profile.role;

  return session;
};

type LoginActionResponse =
  | { success: false; message: string }
  | {
      success: true;
      message: string;
      session: {
        isLoggedIn: boolean;
        id?: string;
        username?: string;
        role?: string;
        token?: string;
      };
    };

export const loginAction = async (
  values: LoginFormSchema
): Promise<LoginActionResponse> => {
  const session = await getSession();
  const result = loginFormSchema.safeParse(values);

  if (!result.success) {
    return {
      success: false,
      message: "Invalid input",
    };
  }

  try {
    const response = await loginRequest(result.data);

    const profile = await getProfileRequest(response.data.token);

    session.token = response.data.token;
    session.isLoggedIn = true;
    session.id = profile.data.id;
    session.username = profile.data.username;
    session.role = profile.data.role;

    await session.save();

    const safeSession = sanitizeSession(session);

    return {
      success: true,
      message: response.message,
      session: safeSession,
    };
  } catch (error) {
    return {
      success: false,
      message: errorHandler(error).message,
    };
  }
};

export const logoutAction = async () => {
  try {
    const cookieStore = await cookies();

    const session = await getIronSession<Session>(cookieStore, sessionOptions);

    session.destroy();

    await session.save();

    return {
      success: true,
      message: "Logout successful",
    };
  } catch (error) {
    return errorHandler(error);
  }
};

"use server";

import { getRackRequest } from "@/lib/api/rack";

export const getRackAction = async (token: string) => {
  const data = await getRackRequest(token);
  return data.data.racks;
};

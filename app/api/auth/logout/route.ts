import { cookies } from "next/headers";
import { handler, json } from "@/lib/api";
import { COOKIE_NAME } from "@/lib/session";

export const POST = handler(async () => {
  cookies().delete(COOKIE_NAME);
  return json({ ok: true });
});

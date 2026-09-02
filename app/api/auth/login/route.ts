import { cookies } from "next/headers";
import { handler, json, ApiError } from "@/lib/api";
import { COOKIE_NAME, signSession } from "@/lib/session";
import { verificarCredenciales } from "@/lib/data/usuarios";

export const POST = handler(async (req: Request) => {
  const { email, password } = await req.json().catch(() => ({}));
  if (!email || !password) throw new ApiError(400, "Faltan datos.");

  const u = await verificarCredenciales(String(email), String(password));
  if (!u) throw new ApiError(401, "Correo o contraseña incorrectos.");

  const token = await signSession({
    sub: u.id,
    email: u.email,
    nombre: u.nombre,
    rol: u.rol,
  });
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return json({ ok: true, rol: u.rol });
});

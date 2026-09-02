import { cookies } from "next/headers";
import { handler, json, ApiError } from "@/lib/api";
import { COOKIE_NAME, signSession } from "@/lib/session";
import { crearUsuario, hayUsuarios } from "@/lib/data/usuarios";
import { prisma } from "@/lib/prisma";

export const POST = handler(async (req: Request) => {
  if (await hayUsuarios())
    throw new ApiError(403, "La configuración inicial ya fue realizada.");

  const { email, password, nombre } = await req.json().catch(() => ({}));
  if (!email || !password || !nombre)
    throw new ApiError(400, "Completá nombre, correo y contraseña.");
  if (String(password).length < 8)
    throw new ApiError(400, "La contraseña debe tener al menos 8 caracteres.");

  const u = await crearUsuario({
    email,
    password,
    nombre,
    rol: "ADMIN",
  });
  await prisma.usuario.update({
    where: { id: u.id },
    data: { emailVerificadoEn: new Date(), aceptoDescargoEn: new Date() },
  });

  const token = await signSession({
    sub: u.id,
    email: u.email,
    nombre: u.nombre,
    rol: "ADMIN",
  });
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return json({ ok: true });
});

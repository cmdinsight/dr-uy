import { cookies } from "next/headers";
import { handler, json, ApiError } from "@/lib/api";
import { COOKIE_NAME, signSession } from "@/lib/session";
import { crearUsuario } from "@/lib/data/usuarios";
import { enviarEmail, escapeHtml } from "@/lib/email";

export const POST = handler(async (req: Request) => {
  const body = await req.json().catch(() => ({}));
  const { email, password, nombre, especialidad, institucion, region, sitio } =
    body;

  // Honeypot antispam: si viene relleno, respondemos ok sin crear nada.
  if (sitio) return json({ ok: true });

  if (!email || !password || !nombre)
    throw new ApiError(400, "Completá nombre, correo y contraseña.");
  if (String(password).length < 8)
    throw new ApiError(400, "La contraseña debe tener al menos 8 caracteres.");

  const u = await crearUsuario({
    email,
    password,
    nombre,
    especialidad,
    institucion,
    region,
  });

  const base =
    process.env.NEXT_PUBLIC_APP_URL ||
    req.headers.get("origin") ||
    "";
  if (base && u.verifToken) {
    const link = `${base}/verificar-email?token=${u.verifToken}`;
    await enviarEmail({
      to: u.email,
      subject: "Confirmá tu correo — DR.UY",
      html: `<p>Hola ${escapeHtml(u.nombre)},</p><p>Confirmá tu correo para DR.UY — Caja de Herramientas:</p><p><a href="${link}">${link}</a></p>`,
    });
  }

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
  return json({ ok: true });
});

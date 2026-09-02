import { handler, json, requireApi, ApiError } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const POST = handler(async (req: Request) => {
  const s = await requireApi();
  const { actual, nueva } = await req.json().catch(() => ({}));
  if (!actual || !nueva) throw new ApiError(400, "Completá ambos campos.");
  if (String(nueva).length < 8)
    throw new ApiError(400, "La nueva contraseña debe tener al menos 8 caracteres.");

  const u = await prisma.usuario.findUnique({ where: { id: s.sub } });
  if (!u) throw new ApiError(404, "Usuario no encontrado.");
  const ok = await bcrypt.compare(String(actual), u.passwordHash);
  if (!ok) throw new ApiError(400, "La contraseña actual es incorrecta.");

  await prisma.usuario.update({
    where: { id: u.id },
    data: { passwordHash: await bcrypt.hash(String(nueva), 10) },
  });
  return json({ ok: true });
});

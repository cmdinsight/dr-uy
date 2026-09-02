import { handler, json, requireApi } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { enviarEmail, escapeHtml } from "@/lib/email";
import { randomUUID } from "crypto";

export const POST = handler(async (req: Request) => {
  const s = await requireApi();
  const u = await prisma.usuario.findUnique({ where: { id: s.sub } });
  if (!u) return json({ ok: false });
  if (u.emailVerificadoEn) return json({ ok: true, yaVerificado: true });

  const token = u.verifToken || randomUUID();
  await prisma.usuario.update({
    where: { id: u.id },
    data: { verifToken: token },
  });

  const base = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "";
  const link = `${base}/verificar-email?token=${token}`;
  const enviado = await enviarEmail({
    to: u.email,
    subject: "Confirmá tu correo — DR.UY",
    html: `<p>Hola ${escapeHtml(u.nombre)},</p><p>Confirmá tu correo:</p><p><a href="${link}">${link}</a></p>`,
  });
  return json({ ok: true, enviado });
});

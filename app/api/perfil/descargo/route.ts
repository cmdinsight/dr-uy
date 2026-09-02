import { handler, json, requireApi } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export const POST = handler(async () => {
  const s = await requireApi();
  await prisma.usuario.update({
    where: { id: s.sub },
    data: { aceptoDescargoEn: new Date() },
  });
  return json({ ok: true });
});

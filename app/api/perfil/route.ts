import { handler, json, requireApi } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export const PUT = handler(async (req: Request) => {
  const s = await requireApi();
  const { nombre, especialidad, institucion, region } = await req
    .json()
    .catch(() => ({}));
  await prisma.usuario.update({
    where: { id: s.sub },
    data: {
      nombre: nombre ? String(nombre).slice(0, 120) : undefined,
      especialidad:
        especialidad !== undefined
          ? String(especialidad || "").slice(0, 120) || null
          : undefined,
      institucion:
        institucion !== undefined
          ? String(institucion || "").slice(0, 160) || null
          : undefined,
      region:
        region !== undefined ? String(region || "").slice(0, 80) || null : undefined,
    },
  });
  return json({ ok: true });
});

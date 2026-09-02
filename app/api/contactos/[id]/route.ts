import { handler, json, requireApi, ApiError } from "@/lib/api";
import { prisma } from "@/lib/prisma";

async function propio(id: string, usuarioId: string) {
  const c = await prisma.contacto.findUnique({ where: { id } });
  if (!c || c.usuarioId !== usuarioId) throw new ApiError(404, "Contacto no encontrado.");
  return c;
}

export const PUT = handler(
  async (req: Request, { params }: { params: { id: string } }) => {
    const s = await requireApi();
    await propio(params.id, s.sub);
    const { nombre, telefono, categoria, notas } = await req.json().catch(() => ({}));
    const c = await prisma.contacto.update({
      where: { id: params.id },
      data: {
        nombre: nombre ? String(nombre).slice(0, 120) : undefined,
        telefono: telefono !== undefined ? String(telefono).slice(0, 40) : undefined,
        categoria: categoria || undefined,
        notas: notas !== undefined ? (notas ? String(notas).slice(0, 300) : null) : undefined,
      },
    });
    return json({ ok: true, id: c.id });
  },
);

export const DELETE = handler(
  async (_req: Request, { params }: { params: { id: string } }) => {
    const s = await requireApi();
    await propio(params.id, s.sub);
    await prisma.contacto.delete({ where: { id: params.id } });
    return json({ ok: true });
  },
);

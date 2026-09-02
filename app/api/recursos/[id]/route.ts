import { handler, json, requireApi, ApiError } from "@/lib/api";
import { prisma } from "@/lib/prisma";

async function propio(id: string, usuarioId: string) {
  const r = await prisma.recurso.findUnique({ where: { id } });
  if (!r || r.esBase || r.usuarioId !== usuarioId)
    throw new ApiError(404, "Recurso no encontrado.");
  return r;
}

export const PUT = handler(
  async (req: Request, { params }: { params: { id: string } }) => {
    const s = await requireApi();
    await propio(params.id, s.sub);
    const { titulo, url, categoria, descripcion } = await req.json().catch(() => ({}));
    const r = await prisma.recurso.update({
      where: { id: params.id },
      data: {
        titulo: titulo ? String(titulo).slice(0, 160) : undefined,
        url: url ? String(url).slice(0, 500) : undefined,
        categoria: categoria || undefined,
        descripcion:
          descripcion !== undefined
            ? descripcion
              ? String(descripcion).slice(0, 300)
              : null
            : undefined,
      },
    });
    return json({ ok: true, id: r.id });
  },
);

export const DELETE = handler(
  async (_req: Request, { params }: { params: { id: string } }) => {
    const s = await requireApi();
    await propio(params.id, s.sub);
    await prisma.recurso.delete({ where: { id: params.id } });
    return json({ ok: true });
  },
);

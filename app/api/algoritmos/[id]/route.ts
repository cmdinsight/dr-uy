import { handler, json, requireApi, ApiError } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export const DELETE = handler(
  async (_req: Request, { params }: { params: { id: string } }) => {
    const s = await requireApi();
    const a = await prisma.algoritmo.findUnique({
      where: { id: params.id },
      select: { id: true, usuarioId: true, esBase: true, imagenId: true },
    });
    if (!a) throw new ApiError(404, "No encontrado.");
    if (a.esBase || a.usuarioId !== s.sub)
      throw new ApiError(403, "No podés eliminar este protocolo.");
    await prisma.algoritmo.delete({ where: { id: a.id } });
    if (a.imagenId)
      await prisma.imagen.delete({ where: { id: a.imagenId } }).catch(() => {});
    return json({ ok: true });
  },
);

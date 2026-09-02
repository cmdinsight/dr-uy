import { handler, json, requireApi, ApiError } from "@/lib/api";
import { prisma } from "@/lib/prisma";

// Solo se pueden borrar los test propios (no los base).
export const DELETE = handler(
  async (_req: Request, { params }: { params: { id: string } }) => {
    const s = await requireApi();
    const test = await prisma.testClinico.findUnique({
      where: { id: params.id },
      select: { id: true, usuarioId: true, esBase: true },
    });
    if (!test) throw new ApiError(404, "Test no encontrado.");
    if (test.esBase || test.usuarioId !== s.sub)
      throw new ApiError(403, "No podés eliminar este test.");
    await prisma.testClinico.delete({ where: { id: test.id } });
    return json({ ok: true });
  },
);

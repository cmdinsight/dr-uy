import { handler, json, requireApi, ApiError } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export const POST = handler(
  async (req: Request, { params }: { params: { id: string } }) => {
    const s = await requireApi();
    const test = await prisma.testClinico.findFirst({
      where: {
        id: params.id,
        OR: [{ esBase: true }, { usuarioId: s.sub }],
      },
      select: { id: true },
    });
    if (!test) throw new ApiError(404, "Test no encontrado.");

    const body = await req.json().catch(() => ({}));
    const { total, nivel, etiquetaResultado, respuestasJson, pacienteRef } = body;
    if (typeof total !== "number" || !nivel || !etiquetaResultado)
      throw new ApiError(400, "Datos incompletos.");

    const reg = await prisma.registroTest.create({
      data: {
        usuarioId: s.sub,
        testId: test.id,
        total,
        nivel,
        etiquetaResultado: String(etiquetaResultado).slice(0, 200),
        respuestasJson: String(respuestasJson ?? "{}").slice(0, 4000),
        pacienteRef: pacienteRef ? String(pacienteRef).slice(0, 80) : null,
      },
    });
    return json({ ok: true, id: reg.id });
  },
);

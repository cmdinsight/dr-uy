import { handler, json, requireApi, ApiError } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { toggleFavoritoContacto } from "@/lib/data/contactos";

export const POST = handler(async (req: Request) => {
  const s = await requireApi();
  const { tipo, ref } = await req.json().catch(() => ({}));
  const usuarioId = s.sub;

  if (tipo === "CONTACTO") {
    await toggleFavoritoContacto(usuarioId, String(ref));
    return json({ ok: true });
  }

  if (tipo === "TEST") {
    const ex = await prisma.testFavorito.findUnique({
      where: { usuarioId_testId: { usuarioId, testId: ref } },
    });
    if (ex) await prisma.testFavorito.delete({ where: { id: ex.id } });
    else await prisma.testFavorito.create({ data: { usuarioId, testId: ref } });
    return json({ ok: true, favorito: !ex });
  }

  if (tipo === "ALGORITMO") {
    const ex = await prisma.algoritmoFavorito.findUnique({
      where: { usuarioId_algoritmoId: { usuarioId, algoritmoId: ref } },
    });
    if (ex) await prisma.algoritmoFavorito.delete({ where: { id: ex.id } });
    else
      await prisma.algoritmoFavorito.create({
        data: { usuarioId, algoritmoId: ref },
      });
    return json({ ok: true, favorito: !ex });
  }

  if (tipo === "RECURSO") {
    const ex = await prisma.recursoFavorito.findUnique({
      where: { usuarioId_recursoId: { usuarioId, recursoId: ref } },
    });
    if (ex) await prisma.recursoFavorito.delete({ where: { id: ex.id } });
    else
      await prisma.recursoFavorito.create({
        data: { usuarioId, recursoId: ref },
      });
    return json({ ok: true, favorito: !ex });
  }

  throw new ApiError(400, "Tipo no válido.");
});

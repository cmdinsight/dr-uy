import { prisma } from "@/lib/prisma";

export interface RecursoListado {
  id: string;
  titulo: string;
  url: string;
  categoria: string;
  descripcion?: string;
  esBase: boolean;
  propio: boolean;
  favorito: boolean;
}

export async function recursosVisibles(
  usuarioId: string,
): Promise<RecursoListado[]> {
  const [recursos, favs] = await Promise.all([
    prisma.recurso.findMany({
      where: { OR: [{ esBase: true }, { usuarioId }] },
      orderBy: [{ categoria: "asc" }, { orden: "asc" }, { titulo: "asc" }],
    }),
    prisma.recursoFavorito.findMany({
      where: { usuarioId },
      select: { recursoId: true },
    }),
  ]);
  const favSet = new Set(favs.map((f) => f.recursoId));
  return recursos.map((r) => ({
    id: r.id,
    titulo: r.titulo,
    url: r.url,
    categoria: r.categoria,
    descripcion: r.descripcion ?? undefined,
    esBase: r.esBase,
    propio: r.usuarioId === usuarioId,
    favorito: favSet.has(r.id),
  }));
}

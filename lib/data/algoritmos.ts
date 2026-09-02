import { prisma } from "@/lib/prisma";

export interface AlgoritmoListado {
  id: string;
  slug: string;
  titulo: string;
  categoria: string;
  resumen: string;
  esBase: boolean;
  propio: boolean;
  favorito: boolean;
}

export async function algoritmosVisibles(
  usuarioId: string,
): Promise<AlgoritmoListado[]> {
  const [algos, favs] = await Promise.all([
    prisma.algoritmo.findMany({
      where: { OR: [{ esBase: true, publicado: true }, { usuarioId }] },
      orderBy: [{ categoria: "asc" }, { titulo: "asc" }],
      select: {
        id: true,
        slug: true,
        titulo: true,
        categoria: true,
        resumen: true,
        esBase: true,
        usuarioId: true,
      },
    }),
    prisma.algoritmoFavorito.findMany({
      where: { usuarioId },
      select: { algoritmoId: true },
    }),
  ]);
  const favSet = new Set(favs.map((f) => f.algoritmoId));
  return algos.map((a) => ({
    id: a.id,
    slug: a.slug,
    titulo: a.titulo,
    categoria: a.categoria,
    resumen: a.resumen,
    esBase: a.esBase,
    propio: a.usuarioId === usuarioId,
    favorito: favSet.has(a.id),
  }));
}

export async function getAlgoritmoParaUsuario(
  idOrSlug: string,
  usuarioId: string,
) {
  const a = await prisma.algoritmo.findFirst({
    where: {
      AND: [
        { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
        { OR: [{ esBase: true }, { usuarioId }] },
      ],
    },
  });
  if (!a) return null;
  const fav = await prisma.algoritmoFavorito.findUnique({
    where: { usuarioId_algoritmoId: { usuarioId, algoritmoId: a.id } },
  });
  return { ...a, favorito: Boolean(fav), propio: a.usuarioId === usuarioId };
}

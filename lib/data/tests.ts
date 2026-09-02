import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import type { TestDef, ItemDef, RangoDef } from "@/lib/tests/tipos";

const testInclude = {
  items: { include: { opciones: { orderBy: { orden: "asc" } } }, orderBy: { orden: "asc" } },
  rangos: { orderBy: { min: "asc" } },
} satisfies Prisma.TestClinicoInclude;

type TestConTodo = Prisma.TestClinicoGetPayload<{ include: typeof testInclude }>;

export function aTestDef(t: TestConTodo): TestDef {
  const items: ItemDef[] = t.items.map((it) => ({
    clave: it.clave,
    enunciado: it.enunciado,
    tipo: it.tipo,
    ayuda: it.ayuda ?? undefined,
    opciones:
      it.tipo === "NUMERICO"
        ? undefined
        : it.opciones.map((o) => ({ etiqueta: o.etiqueta, valor: o.valor })),
    min: it.min ?? undefined,
    max: it.max ?? undefined,
    paso: it.paso ?? undefined,
    sufijo: it.sufijo ?? undefined,
  }));
  const rangos: RangoDef[] = t.rangos.map((r) => ({
    min: r.min,
    max: r.max,
    nivel: r.nivel,
    titulo: r.titulo,
    detalle: r.detalle,
  }));
  return {
    slug: t.slug,
    nombre: t.nombre,
    categoria: t.categoria,
    resumen: t.resumen,
    referencia: t.referencia,
    poblacion: t.poblacion ?? undefined,
    modoCalculo: t.modoCalculo,
    items,
    rangos,
  };
}

export interface TestListado {
  id: string;
  slug: string;
  nombre: string;
  categoria: string;
  resumen: string;
  esBase: boolean;
  propio: boolean;
  favorito: boolean;
}

/** Test que ve un usuario: base publicados + los suyos. */
export async function testsVisibles(usuarioId: string): Promise<TestListado[]> {
  const [tests, favs] = await Promise.all([
    prisma.testClinico.findMany({
      where: {
        OR: [
          { esBase: true, publicado: true },
          { usuarioId },
        ],
      },
      orderBy: [{ categoria: "asc" }, { nombre: "asc" }],
      select: {
        id: true,
        slug: true,
        nombre: true,
        categoria: true,
        resumen: true,
        esBase: true,
        usuarioId: true,
      },
    }),
    prisma.testFavorito.findMany({ where: { usuarioId }, select: { testId: true } }),
  ]);
  const favSet = new Set(favs.map((f) => f.testId));
  return tests.map((t) => ({
    id: t.id,
    slug: t.slug,
    nombre: t.nombre,
    categoria: t.categoria,
    resumen: t.resumen,
    esBase: t.esBase,
    propio: t.usuarioId === usuarioId,
    favorito: favSet.has(t.id),
  }));
}

export async function getTestParaUsuario(idOrSlug: string, usuarioId: string) {
  const t = await prisma.testClinico.findFirst({
    where: {
      AND: [
        { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
        { OR: [{ esBase: true }, { usuarioId }] },
      ],
    },
    include: testInclude,
  });
  if (!t) return null;
  const favorito = await prisma.testFavorito.findUnique({
    where: { usuarioId_testId: { usuarioId, testId: t.id } },
  });
  return {
    id: t.id,
    esBase: t.esBase,
    propio: t.usuarioId === usuarioId,
    favorito: Boolean(favorito),
    def: aTestDef(t),
  };
}

export async function historialTest(usuarioId: string, testId: string) {
  return prisma.registroTest.findMany({
    where: { usuarioId, testId },
    orderBy: { createdAt: "desc" },
    take: 25,
  });
}

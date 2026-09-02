import { prisma } from "@/lib/prisma";
import { CONTENIDO_VERSION } from "@/lib/contenido";

// Payload público y cacheable (lo usa el service worker para la consulta con
// mala señal). Solo contenido base de referencia, sin datos de usuarios.
export async function GET() {
  const [version, tests, algoritmos, contactos, recursos] = await Promise.all([
    prisma.contenidoVersion.findFirst({ orderBy: { publicadoEn: "desc" } }),
    prisma.testClinico.findMany({
      where: { esBase: true, publicado: true },
      orderBy: [{ categoria: "asc" }, { nombre: "asc" }],
      select: { slug: true, nombre: true, categoria: true, resumen: true },
    }),
    prisma.algoritmo.findMany({
      where: { esBase: true, publicado: true },
      orderBy: [{ categoria: "asc" }, { titulo: "asc" }],
      select: { slug: true, titulo: true, categoria: true, resumen: true },
    }),
    prisma.contactoBase.findMany({
      where: { activo: true },
      orderBy: [{ categoria: "asc" }, { orden: "asc" }],
      select: { nombre: true, telefono: true, categoria: true, descripcion: true },
    }),
    prisma.recurso.findMany({
      where: { esBase: true },
      orderBy: [{ categoria: "asc" }, { orden: "asc" }],
      select: { titulo: true, url: true, categoria: true, descripcion: true },
    }),
  ]);

  return Response.json(
    {
      version: version?.etiqueta ?? CONTENIDO_VERSION,
      publicadoEn: version?.publicadoEn ?? null,
      generadoEn: new Date().toISOString(),
      tests,
      algoritmos,
      contactos,
      recursos,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=86400",
      },
    },
  );
}

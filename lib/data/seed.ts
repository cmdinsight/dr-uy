// Siembra / actualiza el contenido base a partir de lib/**/seed. Idempotente por
// slug: se puede correr todas las veces que haga falta. No toca el contenido de
// los usuarios.

import { prisma } from "@/lib/prisma";
import { CONTACTOS_BASE } from "@/lib/contactos/seed";
import { RECURSOS_BASE } from "@/lib/recursos/seed";
import { TESTS_BASE } from "@/lib/tests/seed";
import { ALGORITMOS_BASE } from "@/lib/algoritmos/seed";
import { CONTENIDO_VERSION, CONTENIDO_NOTAS } from "@/lib/contenido";

export interface ResultadoSeed {
  contactos: number;
  tests: number;
  algoritmos: number;
  recursos: number;
  version: string;
}

export async function sembrarContenidoBase(): Promise<ResultadoSeed> {
  // ── Contactos ────────────────────────────────────────────────
  for (const c of CONTACTOS_BASE) {
    await prisma.contactoBase.upsert({
      where: { slug: c.slug },
      create: {
        slug: c.slug,
        categoria: c.categoria,
        nombre: c.nombre,
        telefono: c.telefono,
        descripcion: c.descripcion,
        region: c.region,
        orden: c.orden,
        activo: c.activo ?? true,
      },
      update: {
        categoria: c.categoria,
        nombre: c.nombre,
        telefono: c.telefono,
        descripcion: c.descripcion,
        region: c.region,
        orden: c.orden,
        activo: c.activo ?? true,
      },
    });
  }

  // ── Recursos ─────────────────────────────────────────────────
  for (const r of RECURSOS_BASE) {
    await prisma.recurso.upsert({
      where: { slug: r.slug },
      create: {
        slug: r.slug,
        titulo: r.titulo,
        url: r.url,
        categoria: r.categoria,
        descripcion: r.descripcion,
        orden: r.orden,
        esBase: true,
      },
      update: {
        titulo: r.titulo,
        url: r.url,
        categoria: r.categoria,
        descripcion: r.descripcion,
        orden: r.orden,
        esBase: true,
      },
    });
  }

  // ── Tests ────────────────────────────────────────────────────
  for (const t of TESTS_BASE) {
    const test = await prisma.testClinico.upsert({
      where: { slug: t.slug },
      create: {
        slug: t.slug,
        nombre: t.nombre,
        categoria: t.categoria,
        resumen: t.resumen,
        referencia: t.referencia,
        poblacion: t.poblacion,
        modoCalculo: t.modoCalculo,
        publicado: true,
        esBase: true,
      },
      update: {
        nombre: t.nombre,
        categoria: t.categoria,
        resumen: t.resumen,
        referencia: t.referencia,
        poblacion: t.poblacion,
        modoCalculo: t.modoCalculo,
        publicado: true,
        esBase: true,
      },
    });

    // Reemplazar ítems y rangos (cascade borra opciones).
    await prisma.testItem.deleteMany({ where: { testId: test.id } });
    await prisma.testRango.deleteMany({ where: { testId: test.id } });

    for (let i = 0; i < t.items.length; i++) {
      const it = t.items[i];
      await prisma.testItem.create({
        data: {
          testId: test.id,
          clave: it.clave,
          orden: i,
          enunciado: it.enunciado,
          tipo: it.tipo,
          ayuda: it.ayuda,
          min: it.min,
          max: it.max,
          paso: it.paso,
          sufijo: it.sufijo,
          opciones: it.opciones
            ? {
                create: it.opciones.map((o, j) => ({
                  orden: j,
                  etiqueta: o.etiqueta,
                  valor: o.valor,
                })),
              }
            : undefined,
        },
      });
    }

    for (const r of t.rangos) {
      await prisma.testRango.create({
        data: {
          testId: test.id,
          min: r.min,
          max: r.max,
          nivel: r.nivel,
          titulo: r.titulo,
          detalle: r.detalle,
        },
      });
    }
  }

  // ── Algoritmos (+ diagrama como Imagen) ──────────────────────
  for (const a of ALGORITMOS_BASE) {
    const bytes = Buffer.from(a.svg, "utf8");
    const existente = await prisma.algoritmo.findUnique({
      where: { slug: a.slug },
      select: { id: true, imagenId: true },
    });

    let imagenId = existente?.imagenId ?? null;
    if (imagenId) {
      await prisma.imagen.update({
        where: { id: imagenId },
        data: { mime: "image/svg+xml", datos: bytes },
      });
    } else {
      const img = await prisma.imagen.create({
        data: { mime: "image/svg+xml", datos: bytes },
      });
      imagenId = img.id;
    }

    await prisma.algoritmo.upsert({
      where: { slug: a.slug },
      create: {
        slug: a.slug,
        titulo: a.titulo,
        categoria: a.categoria,
        resumen: a.resumen,
        contenidoMd: a.contenidoMd,
        fuente: a.fuente,
        imagenId,
        publicado: true,
        esBase: true,
      },
      update: {
        titulo: a.titulo,
        categoria: a.categoria,
        resumen: a.resumen,
        contenidoMd: a.contenidoMd,
        fuente: a.fuente,
        imagenId,
        publicado: true,
        esBase: true,
      },
    });
  }

  // ── Versión de contenido ────────────────────────────────────
  const yaExiste = await prisma.contenidoVersion.findFirst({
    where: { etiqueta: CONTENIDO_VERSION },
  });
  if (!yaExiste) {
    await prisma.contenidoVersion.create({
      data: { etiqueta: CONTENIDO_VERSION, notas: CONTENIDO_NOTAS },
    });
  }

  return {
    contactos: CONTACTOS_BASE.length,
    tests: TESTS_BASE.length,
    algoritmos: ALGORITMOS_BASE.length,
    recursos: RECURSOS_BASE.length,
    version: CONTENIDO_VERSION,
  };
}

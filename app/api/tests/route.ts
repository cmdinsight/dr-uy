import { handler, json, requireApi, ApiError } from "@/lib/api";
import { prisma } from "@/lib/prisma";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 50);
}

export const POST = handler(async (req: Request) => {
  const s = await requireApi();
  const body = await req.json().catch(() => ({}));
  const { nombre, categoria, resumen, referencia, modoCalculo, items, rangos } =
    body;

  if (!nombre || !categoria)
    throw new ApiError(400, "El test necesita al menos nombre y categoría.");
  if (!Array.isArray(items) || items.length === 0)
    throw new ApiError(400, "Agregá al menos un ítem.");

  const base = slugify(nombre) || "test";
  let slug = `${base}-${s.sub.slice(0, 4)}`;
  let n = 1;
  while (await prisma.testClinico.findUnique({ where: { slug } })) {
    slug = `${base}-${s.sub.slice(0, 4)}-${n++}`;
  }

  const test = await prisma.testClinico.create({
    data: {
      slug,
      nombre: String(nombre).slice(0, 160),
      categoria,
      resumen: String(resumen || "").slice(0, 400) || "Test personalizado.",
      referencia: String(referencia || "").slice(0, 300) || "Definido por el usuario.",
      modoCalculo: modoCalculo === "REGLA_CUALQUIERA_POSITIVO" ? "REGLA_CUALQUIERA_POSITIVO" : "SUMA",
      esBase: false,
      publicado: true,
      usuarioId: s.sub,
    },
  });

  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const tipo =
      it.tipo === "NUMERICO" || it.tipo === "MULTIPLE" ? it.tipo : "UNICA";
    await prisma.testItem.create({
      data: {
        testId: test.id,
        clave: `i${i}`,
        orden: i,
        enunciado: String(it.enunciado || `Ítem ${i + 1}`).slice(0, 300),
        tipo,
        ayuda: it.ayuda ? String(it.ayuda).slice(0, 300) : null,
        min: tipo === "NUMERICO" ? Number(it.min ?? 0) : null,
        max: tipo === "NUMERICO" ? Number(it.max ?? 10) : null,
        paso: tipo === "NUMERICO" ? Number(it.paso ?? 1) : null,
        opciones:
          tipo === "NUMERICO"
            ? undefined
            : {
                create: (Array.isArray(it.opciones) ? it.opciones : [])
                  .slice(0, 12)
                  .map((o: { etiqueta?: string; valor?: number }, j: number) => ({
                    orden: j,
                    etiqueta: String(o.etiqueta || `Opción ${j + 1}`).slice(0, 160),
                    valor: Number.isFinite(Number(o.valor)) ? Math.trunc(Number(o.valor)) : 0,
                  })),
              },
      },
    });
  }

  for (const r of Array.isArray(rangos) ? rangos : []) {
    await prisma.testRango.create({
      data: {
        testId: test.id,
        min: Math.trunc(Number(r.min ?? 0)),
        max: Math.trunc(Number(r.max ?? 0)),
        nivel: ["INFO", "LEVE", "MODERADO", "GRAVE"].includes(r.nivel)
          ? r.nivel
          : "INFO",
        titulo: String(r.titulo || "Resultado").slice(0, 160),
        detalle: String(r.detalle || "").slice(0, 600),
      },
    });
  }

  return json({ ok: true, slug: test.slug });
});

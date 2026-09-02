import { handler, json, requireApi, ApiError } from "@/lib/api";
import { prisma } from "@/lib/prisma";

const CATS = [
  "REANIMACION",
  "VIA_AEREA",
  "CARDIOVASCULAR",
  "NEUROLOGIA",
  "RESPIRATORIO",
  "METABOLICO",
  "TRAUMA",
  "TOXICOLOGIA",
  "MISCELANEAS",
];

const MIMES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/svg+xml": "svg",
  "image/gif": "gif",
};

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
  const { titulo, categoria, resumen, contenidoMd, fuente, imagenDataUrl } =
    await req.json().catch(() => ({}));

  if (!titulo) throw new ApiError(400, "El protocolo necesita un título.");

  let imagenId: string | null = null;
  if (imagenDataUrl) {
    const m = /^data:([^;]+);base64,(.+)$/.exec(String(imagenDataUrl));
    if (!m || !MIMES[m[1]])
      throw new ApiError(400, "Imagen no válida (PNG, JPG, WEBP o SVG).");
    const bytes = Buffer.from(m[2], "base64");
    if (bytes.length > 2 * 1024 * 1024)
      throw new ApiError(400, "La imagen supera los 2 MB.");
    const img = await prisma.imagen.create({
      data: { mime: m[1], datos: bytes, usuarioId: s.sub },
    });
    imagenId = img.id;
  }

  const base = slugify(titulo) || "protocolo";
  let slug = `${base}-${s.sub.slice(0, 4)}`;
  let n = 1;
  while (await prisma.algoritmo.findUnique({ where: { slug } })) {
    slug = `${base}-${s.sub.slice(0, 4)}-${n++}`;
  }

  const a = await prisma.algoritmo.create({
    data: {
      slug,
      titulo: String(titulo).slice(0, 160),
      categoria: CATS.includes(categoria) ? categoria : "MISCELANEAS",
      resumen: String(resumen || "").slice(0, 400) || "Protocolo propio.",
      contenidoMd: contenidoMd ? String(contenidoMd).slice(0, 20000) : null,
      fuente: fuente ? String(fuente).slice(0, 300) : null,
      imagenId,
      esBase: false,
      publicado: true,
      usuarioId: s.sub,
    },
  });
  return json({ ok: true, slug: a.slug });
});

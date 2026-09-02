import { handler, json, requireApi, ApiError } from "@/lib/api";
import { prisma } from "@/lib/prisma";

const CATS = ["GUIAS", "CALCULADORAS", "FORMACION", "VADEMECUM", "SOCIEDADES", "OTROS"];

function normalizarUrl(u: string): string {
  const s = u.trim();
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  return `https://${s}`;
}

export const POST = handler(async (req: Request) => {
  const s = await requireApi();
  const { titulo, url, categoria, descripcion } = await req.json().catch(() => ({}));
  const finalUrl = normalizarUrl(String(url || ""));
  if (!titulo || !finalUrl) throw new ApiError(400, "Título y enlace son obligatorios.");

  const r = await prisma.recurso.create({
    data: {
      titulo: String(titulo).slice(0, 160),
      url: finalUrl.slice(0, 500),
      categoria: CATS.includes(categoria) ? categoria : "OTROS",
      descripcion: descripcion ? String(descripcion).slice(0, 300) : null,
      esBase: false,
      usuarioId: s.sub,
    },
  });
  return json({ ok: true, id: r.id });
});

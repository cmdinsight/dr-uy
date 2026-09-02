import { handler, json, requireApi, ApiError } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { contactosEfectivos } from "@/lib/data/contactos";

const CATS = [
  "EMERGENCIA_MOVIL",
  "HEMODINAMIA",
  "LABORATORIO",
  "TOXICOLOGIA",
  "HEMOTERAPIA",
  "IMAGENOLOGIA",
  "SALUD_MENTAL",
  "VIOLENCIA",
  "ESPECIALISTAS",
  "COLEGAS",
  "OTROS",
];

export const GET = handler(async () => {
  const s = await requireApi();
  return json({ contactos: await contactosEfectivos(s.sub) });
});

export const POST = handler(async (req: Request) => {
  const s = await requireApi();
  const { nombre, telefono, categoria, notas } = await req.json().catch(() => ({}));
  if (!nombre || !telefono) throw new ApiError(400, "Nombre y teléfono son obligatorios.");
  const c = await prisma.contacto.create({
    data: {
      usuarioId: s.sub,
      nombre: String(nombre).slice(0, 120),
      telefono: String(telefono).slice(0, 40),
      categoria: CATS.includes(categoria) ? categoria : "OTROS",
      notas: notas ? String(notas).slice(0, 300) : null,
    },
  });
  return json({ ok: true, id: c.id });
});

import { handler, json, requireApi, ApiError } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export const POST = handler(async (req: Request) => {
  const s = await requireApi();
  const { contactoBaseId, oculto, telefonoCustom } = await req.json().catch(() => ({}));
  if (!contactoBaseId) throw new ApiError(400, "Falta el contacto.");

  const base = await prisma.contactoBase.findUnique({ where: { id: contactoBaseId } });
  if (!base) throw new ApiError(404, "Contacto base no encontrado.");

  const data: { oculto?: boolean; telefonoCustom?: string | null } = {};
  if (typeof oculto === "boolean") data.oculto = oculto;
  if (telefonoCustom !== undefined)
    data.telefonoCustom = telefonoCustom ? String(telefonoCustom).slice(0, 40) : null;

  await prisma.contactoBaseAjuste.upsert({
    where: { usuarioId_contactoBaseId: { usuarioId: s.sub, contactoBaseId } },
    create: { usuarioId: s.sub, contactoBaseId, ...data },
    update: data,
  });
  return json({ ok: true });
});

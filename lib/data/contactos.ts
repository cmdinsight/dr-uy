import { prisma } from "@/lib/prisma";
import type { CategoriaContacto } from "@prisma/client";

export interface ContactoEfectivo {
  key: string; // "base:<id>" | "user:<id>"
  origen: "base" | "usuario";
  id: string; // id de ContactoBase o de Contacto
  categoria: CategoriaContacto;
  nombre: string;
  telefono: string;
  descripcion?: string;
  favorito: boolean;
  editable: boolean; // los base no se editan (solo se oculta / sobrescribe el teléfono)
}

/** Lista de contactos que ve el usuario: base (con sus ajustes) + propios. */
export async function contactosEfectivos(
  usuarioId: string,
): Promise<ContactoEfectivo[]> {
  const [bases, ajustes, propios] = await Promise.all([
    prisma.contactoBase.findMany({
      where: { activo: true },
      orderBy: [{ categoria: "asc" }, { orden: "asc" }],
    }),
    prisma.contactoBaseAjuste.findMany({ where: { usuarioId } }),
    prisma.contacto.findMany({
      where: { usuarioId },
      orderBy: [{ categoria: "asc" }, { orden: "asc" }, { createdAt: "asc" }],
    }),
  ]);

  const ajustePorBase = new Map(ajustes.map((a) => [a.contactoBaseId, a]));

  const deBase: ContactoEfectivo[] = bases
    .map((b): ContactoEfectivo | null => {
      const aj = ajustePorBase.get(b.id);
      if (aj?.oculto) return null;
      return {
        key: `base:${b.id}`,
        origen: "base",
        id: b.id,
        categoria: b.categoria,
        nombre: b.nombre,
        telefono: aj?.telefonoCustom || b.telefono,
        descripcion: b.descripcion ?? undefined,
        favorito: Boolean(aj?.favorito),
        editable: false,
      };
    })
    .filter((x): x is ContactoEfectivo => x !== null);

  const deUsuario: ContactoEfectivo[] = propios.map((c) => ({
    key: `user:${c.id}`,
    origen: "usuario",
    id: c.id,
    categoria: c.categoria,
    nombre: c.nombre,
    telefono: c.telefono,
    descripcion: c.notas ?? undefined,
    favorito: c.favorito,
    editable: true,
  }));

  return [...deBase, ...deUsuario];
}

export async function toggleFavoritoContacto(
  usuarioId: string,
  key: string,
): Promise<void> {
  const [origen, id] = key.split(":");
  if (origen === "user") {
    const c = await prisma.contacto.findFirst({ where: { id, usuarioId } });
    if (!c) return;
    await prisma.contacto.update({
      where: { id },
      data: { favorito: !c.favorito },
    });
  } else {
    const aj = await prisma.contactoBaseAjuste.findUnique({
      where: { usuarioId_contactoBaseId: { usuarioId, contactoBaseId: id } },
    });
    await prisma.contactoBaseAjuste.upsert({
      where: { usuarioId_contactoBaseId: { usuarioId, contactoBaseId: id } },
      create: { usuarioId, contactoBaseId: id, favorito: true },
      update: { favorito: !aj?.favorito },
    });
  }
}

export async function ocultarContactoBase(
  usuarioId: string,
  contactoBaseId: string,
  oculto: boolean,
): Promise<void> {
  await prisma.contactoBaseAjuste.upsert({
    where: { usuarioId_contactoBaseId: { usuarioId, contactoBaseId } },
    create: { usuarioId, contactoBaseId, oculto },
    update: { oculto },
  });
}

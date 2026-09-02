import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import type { RolUsuario } from "@prisma/client";

export async function hayUsuarios(): Promise<boolean> {
  const n = await prisma.usuario.count();
  return n > 0;
}

export interface NuevoUsuario {
  email: string;
  password: string;
  nombre: string;
  rol?: RolUsuario;
  especialidad?: string | null;
  institucion?: string | null;
  region?: string | null;
}

export async function crearUsuario(input: NuevoUsuario) {
  const email = input.email.trim().toLowerCase();
  const existe = await prisma.usuario.findUnique({ where: { email } });
  if (existe) throw new Error("Ya existe una cuenta con ese correo.");
  const passwordHash = await bcrypt.hash(input.password, 10);
  return prisma.usuario.create({
    data: {
      email,
      passwordHash,
      nombre: input.nombre.trim(),
      rol: input.rol ?? "PROFESIONAL",
      especialidad: input.especialidad || null,
      institucion: input.institucion || null,
      region: input.region || null,
      verifToken: randomUUID(),
    },
  });
}

export async function verificarCredenciales(email: string, password: string) {
  const u = await prisma.usuario.findUnique({
    where: { email: email.trim().toLowerCase() },
  });
  if (!u) return null;
  const ok = await bcrypt.compare(password, u.passwordHash);
  return ok ? u : null;
}

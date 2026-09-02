export type Rol = "PROFESIONAL" | "ADMIN";

export const ROLES: Rol[] = ["PROFESIONAL", "ADMIN"];

export const ROL_LABEL: Record<Rol, string> = {
  PROFESIONAL: "Profesional",
  ADMIN: "Administrador de contenido",
};

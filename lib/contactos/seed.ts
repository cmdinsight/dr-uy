// Contactos base (referencia, Uruguay). Cada profesional los ve, puede ocultarlos
// y puede cargar el teléfono real de su servicio encima (ContactoBaseAjuste).
//
// Los números marcados como "referencia nacional" son líneas públicas verificables.
// Los de servicios asistenciales concretos (emergencia móvil, hemodinamia,
// laboratorio de guardia) dependen de la institución de cada usuario: van como
// placeholder para que cada quien cargue el suyo.

import type { CategoriaContacto } from "@prisma/client";

export interface ContactoBaseSeed {
  slug: string;
  categoria: CategoriaContacto;
  nombre: string;
  telefono: string;
  descripcion?: string;
  region?: string;
  orden: number;
  activo?: boolean;
}

export const CONTACTOS_BASE: ContactoBaseSeed[] = [
  // ── Toxicología ────────────────────────────────────────────────
  {
    slug: "ciat",
    categoria: "TOXICOLOGIA",
    nombre: "CIAT — Centro de Información y Asesoramiento Toxicológico",
    telefono: "1722",
    descripcion:
      "Consulta toxicológica 24 h (Facultad de Medicina / MSP). Intoxicaciones, mordeduras, dosis de antídotos.",
    region: "Nacional",
    orden: 10,
  },
  // ── Salud mental ───────────────────────────────────────────────
  {
    slug: "linea-vida",
    categoria: "SALUD_MENTAL",
    nombre: "Línea Vida — prevención del suicidio",
    telefono: "08000767",
    descripcion: "Atención en crisis 24 h. También *0767 desde celular.",
    region: "Nacional",
    orden: 10,
  },
  {
    slug: "linea-apoyo-emocional",
    categoria: "SALUD_MENTAL",
    nombre: "Línea de Apoyo Emocional (ASSE)",
    telefono: "08001920",
    descripcion: "Escucha y contención telefónica.",
    region: "Nacional",
    orden: 20,
  },
  // ── Violencia ──────────────────────────────────────────────────
  {
    slug: "linea-violencia",
    categoria: "VIOLENCIA",
    nombre: "Servicio de orientación en violencia basada en género — Inmujeres",
    telefono: "08004141",
    descripcion: "24 h. Desde celular: *4141.",
    region: "Nacional",
    orden: 10,
  },
  {
    slug: "linea-azul-inau",
    categoria: "VIOLENCIA",
    nombre: "Línea Azul — INAU (niñez y adolescencia)",
    telefono: "08005050",
    descripcion: "Vulneración de derechos de niños, niñas y adolescentes.",
    region: "Nacional",
    orden: 20,
  },
  // ── Emergencia ─────────────────────────────────────────────────
  {
    slug: "emergencia-105",
    categoria: "EMERGENCIA_MOVIL",
    nombre: "Emergencia pública — 105 (DINACEM / ASSE)",
    telefono: "105",
    descripcion: "Ambulancia del sistema público.",
    region: "Nacional",
    orden: 5,
  },
  {
    slug: "emergencia-movil-institucional",
    categoria: "EMERGENCIA_MOVIL",
    nombre: "Emergencia móvil de mi institución (cabina)",
    telefono: "",
    descripcion:
      "Cargá acá el número de cabina de la emergencia móvil con la que trabajás.",
    orden: 10,
    activo: true,
  },
  {
    slug: "bomberos-911",
    categoria: "EMERGENCIA_MOVIL",
    nombre: "Emergencias — 911",
    telefono: "911",
    descripcion: "Policía, bomberos y coordinación de emergencias.",
    region: "Nacional",
    orden: 20,
  },
  // ── Placeholders por servicio ──────────────────────────────────
  {
    slug: "hemodinamia-referencia",
    categoria: "HEMODINAMIA",
    nombre: "Hemodinamia / unidad de dolor torácico de referencia",
    telefono: "",
    descripcion: "Cargá el teléfono directo de la sala de hemodinamia que recibe tus derivaciones.",
    orden: 10,
  },
  {
    slug: "laboratorio-guardia",
    categoria: "LABORATORIO",
    nombre: "Laboratorio de urgencia",
    telefono: "",
    descripcion: "Teléfono del laboratorio de guardia de tu institución.",
    orden: 10,
  },
  {
    slug: "hemoterapia-banco",
    categoria: "HEMOTERAPIA",
    nombre: "Banco de sangre / Hemoterapia",
    telefono: "",
    descripcion: "Solicitud de hemocomponentes y reserva quirúrgica.",
    orden: 10,
  },
  {
    slug: "imagenologia-guardia",
    categoria: "IMAGENOLOGIA",
    nombre: "Imagenología de guardia (TC / ecografía)",
    telefono: "",
    descripcion: "Coordinación de estudios urgentes.",
    orden: 10,
  },
  {
    slug: "especialista-guardia-ejemplo",
    categoria: "ESPECIALISTAS",
    nombre: "Especialista de guardia (ej. cardiología)",
    telefono: "",
    descripcion: "Agregá acá los referentes de cada especialidad con los que consultás.",
    orden: 10,
  },
];

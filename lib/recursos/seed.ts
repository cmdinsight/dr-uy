// Recursos académicos base. Enlaces de referencia y formación. El usuario agrega,
// edita y oculta los suyos libremente.

import type { CategoriaRecurso } from "@prisma/client";

export interface RecursoBaseSeed {
  slug: string;
  titulo: string;
  url: string;
  categoria: CategoriaRecurso;
  descripcion?: string;
  orden: number;
}

export const RECURSOS_BASE: RecursoBaseSeed[] = [
  {
    slug: "msp-guias",
    titulo: "MSP Uruguay — Guías de práctica clínica y normativa",
    url: "https://www.gub.uy/ministerio-salud-publica/politicas-y-gestion/guias-clinicas-protocolos-atencion",
    categoria: "GUIAS",
    descripcion: "Guías nacionales por tema, ordenanzas y protocolos del Ministerio de Salud Pública.",
    orden: 10,
  },
  {
    slug: "ftm-msp",
    titulo: "Formulario Terapéutico de Medicamentos (FTM) — MSP",
    url: "https://www.gub.uy/ministerio-salud-publica/formulario-terapeutico-medicamentos",
    categoria: "VADEMECUM",
    descripcion: "Vademécum oficial: principios activos incluidos en el FTM y sus condiciones de uso.",
    orden: 10,
  },
  {
    slug: "mdcalc",
    titulo: "MDCalc",
    url: "https://www.mdcalc.com/",
    categoria: "CALCULADORAS",
    descripcion: "Calculadoras y scores clínicos con la evidencia detrás de cada punto de corte.",
    orden: 10,
  },
  {
    slug: "carne-adulto-mayor",
    titulo: "Programa Nacional del Adulto Mayor — MSP",
    url: "https://www.gub.uy/ministerio-salud-publica/politicas-y-gestion/programas/adulto-mayor",
    categoria: "GUIAS",
    descripcion: "Marco del control del adulto mayor y la valoración geriátrica integral en el primer nivel.",
    orden: 20,
  },
  {
    slug: "suc",
    titulo: "Sociedad Uruguaya de Cardiología",
    url: "https://www.suc.org.uy/",
    categoria: "SOCIEDADES",
    descripcion: "Consensos y guías nacionales de cardiología.",
    orden: 10,
  },
  {
    slug: "bvs-uruguay",
    titulo: "Biblioteca Virtual en Salud — Uruguay",
    url: "https://uruguay.bvsalud.org/",
    categoria: "FORMACION",
    descripcion: "Acceso a LILACS, SciELO y literatura biomédica regional.",
    orden: 10,
  },
  {
    slug: "litfl",
    titulo: "Life in the Fast Lane (LITFL)",
    url: "https://litfl.com/",
    categoria: "FORMACION",
    descripcion: "ECG, medicina de urgencia y cuidados críticos. Recurso de consulta rápida.",
    orden: 20,
  },
  {
    slug: "aha-eccguidelines",
    titulo: "AHA — Guías de RCP y ACE",
    url: "https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines",
    categoria: "GUIAS",
    descripcion: "Algoritmos de soporte vital básico y avanzado de la American Heart Association.",
    orden: 30,
  },
  {
    slug: "who-imai",
    titulo: "OMS — publicaciones clínicas y de emergencias",
    url: "https://www.who.int/publications",
    categoria: "GUIAS",
    descripcion: "Documentos técnicos y guías de la Organización Mundial de la Salud.",
    orden: 40,
  },
];

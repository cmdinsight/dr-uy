import type { TestDef } from "../tipos";
import {
  GLASGOW,
  QSOFA,
  NEWS2,
  CINCINNATI,
  DOLOR_EVA,
} from "./emergencia";
import {
  CURB65,
  WELLS_TEP,
  PERC,
  CENTOR,
  ALVARADO,
} from "./respiratorio";
import {
  WELLS_TVP,
  HEART,
  CHADSVASC,
  HASBLED,
} from "./cardiovascular";
import {
  BARTHEL,
  KATZ,
  LAWTON,
  PFEIFFER,
  YESAVAGE,
  MNA_SF,
  TINETTI,
  BARBER,
  DOWNTON,
} from "./geriatria";

/** Catálogo completo de test clínicos del contenido base. */
export const TESTS_BASE: TestDef[] = [
  // Emergencia / valoración inicial
  GLASGOW,
  QSOFA,
  NEWS2,
  CINCINNATI,
  DOLOR_EVA,
  // Respiratorio / infeccioso
  CURB65,
  WELLS_TEP,
  PERC,
  CENTOR,
  ALVARADO,
  // Cardiovascular
  WELLS_TVP,
  HEART,
  CHADSVASC,
  HASBLED,
  // Geriatría (valoración geriátrica integral · Carné del Adulto Mayor)
  BARTHEL,
  KATZ,
  LAWTON,
  PFEIFFER,
  YESAVAGE,
  MNA_SF,
  TINETTI,
  BARBER,
  DOWNTON,
];

export function testPorSlug(slug: string): TestDef | undefined {
  return TESTS_BASE.find((t) => t.slug === slug);
}

// Formas normalizadas de un test clínico. Las usan tanto las definiciones del
// contenido base (lib/tests/seed) como el mapeo desde Prisma (lib/data/tests).

export type NivelInterpretacion = "INFO" | "LEVE" | "MODERADO" | "GRAVE";

export type CategoriaTest =
  | "EMERGENCIA"
  | "CARDIOVASCULAR"
  | "RESPIRATORIO"
  | "NEUROLOGIA"
  | "GERIATRIA"
  | "INFECCIOSO"
  | "TRAUMA"
  | "DOLOR"
  | "OTROS";

export type TipoItemTest = "UNICA" | "MULTIPLE" | "NUMERICO";

export type ModoCalculo = "SUMA" | "REGLA_CUALQUIERA_POSITIVO";

export interface OpcionDef {
  etiqueta: string;
  valor: number;
}

export interface ItemDef {
  /** Clave estable dentro del test (no cambia entre versiones del contenido). */
  clave: string;
  enunciado: string;
  tipo: TipoItemTest;
  ayuda?: string;
  /** Para UNICA / MULTIPLE. */
  opciones?: OpcionDef[];
  /** Para NUMERICO. */
  min?: number;
  max?: number;
  paso?: number;
  sufijo?: string;
}

export interface RangoDef {
  min: number;
  max: number;
  nivel: NivelInterpretacion;
  titulo: string;
  detalle: string;
}

export interface TestDef {
  slug: string;
  nombre: string;
  categoria: CategoriaTest;
  resumen: string;
  referencia: string;
  poblacion?: string;
  modoCalculo: ModoCalculo;
  items: ItemDef[];
  rangos: RangoDef[];
}

/** Respuestas del usuario, indexadas por `ItemDef.clave`. */
export type Respuestas = Record<string, number | number[] | null | undefined>;

export interface ResultadoTest {
  total: number;
  maximo: number;
  nivel: NivelInterpretacion;
  titulo: string;
  detalle: string;
  completo: boolean;
}

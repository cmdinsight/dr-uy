// Motor de cálculo de test clínicos. Puro y determinístico: mismas entradas →
// misma salida. Sin dependencias de Prisma ni de React, para poder testearlo
// en aislamiento.

import type {
  ItemDef,
  RangoDef,
  Respuestas,
  ResultadoTest,
  TestDef,
} from "./tipos";

/** Aporte numérico de un ítem según su tipo y la respuesta cargada. */
export function aporteItem(
  item: ItemDef,
  resp: number | number[] | null | undefined,
): number {
  if (resp == null) return 0;
  if (item.tipo === "MULTIPLE") {
    const arr = Array.isArray(resp) ? resp : [resp];
    return arr.reduce((a, b) => a + (Number(b) || 0), 0);
  }
  // UNICA / NUMERICO
  const n = Array.isArray(resp) ? resp[0] : resp;
  return Number(n) || 0;
}

/** ¿El ítem tiene una respuesta cargada? (para saber si el test está completo) */
export function itemRespondido(
  item: ItemDef,
  resp: number | number[] | null | undefined,
): boolean {
  // En MULTIPLE, "ninguno seleccionado" es una respuesta válida.
  if (item.tipo === "MULTIPLE") return true;
  return resp != null;
}

/** Máximo puntaje alcanzable. */
export function maximoTest(test: TestDef): number {
  if (test.modoCalculo === "REGLA_CUALQUIERA_POSITIVO") return test.items.length;
  return test.items.reduce((acc, item) => {
    if (item.tipo === "NUMERICO") return acc + (item.max ?? 0);
    const vals = (item.opciones ?? []).map((o) => o.valor);
    if (vals.length === 0) return acc;
    if (item.tipo === "MULTIPLE")
      return acc + vals.filter((v) => v > 0).reduce((a, b) => a + b, 0);
    return acc + Math.max(...vals);
  }, 0);
}

function rangoDe(rangos: RangoDef[], total: number): RangoDef | null {
  return (
    rangos.find((r) => total >= r.min && total <= r.max) ??
    rangos[rangos.length - 1] ??
    null
  );
}

export function calcular(test: TestDef, respuestas: Respuestas): ResultadoTest {
  const maximo = maximoTest(test);

  let total: number;
  if (test.modoCalculo === "REGLA_CUALQUIERA_POSITIVO") {
    total = test.items.reduce(
      (acc, item) => acc + (aporteItem(item, respuestas[item.clave]) > 0 ? 1 : 0),
      0,
    );
  } else {
    total = test.items.reduce(
      (acc, item) => acc + aporteItem(item, respuestas[item.clave]),
      0,
    );
  }

  const completo = test.items.every((item) =>
    itemRespondido(item, respuestas[item.clave]),
  );

  const r = rangoDe(test.rangos, total);
  return {
    total,
    maximo,
    nivel: r?.nivel ?? "INFO",
    titulo: r?.titulo ?? "Sin interpretación disponible",
    detalle: r?.detalle ?? "",
    completo,
  };
}

export const NIVEL_LABEL: Record<ResultadoTest["nivel"], string> = {
  INFO: "Informativo",
  LEVE: "Bajo",
  MODERADO: "Intermedio",
  GRAVE: "Alto",
};

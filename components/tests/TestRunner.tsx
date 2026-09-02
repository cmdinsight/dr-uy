"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { TestDef, Respuestas } from "@/lib/tests/tipos";
import { calcular } from "@/lib/tests/engine";
import { NIVEL_LABEL } from "@/lib/labels";

export function TestRunner({
  testId,
  def,
}: {
  testId: string;
  def: TestDef;
}) {
  const router = useRouter();
  const [resp, setResp] = useState<Respuestas>({});
  const [pacienteRef, setPacienteRef] = useState("");
  const [guardado, setGuardado] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const resultado = useMemo(() => calcular(def, resp), [def, resp]);

  function setUnica(clave: string, valor: number) {
    setResp((p) => ({ ...p, [clave]: valor }));
    setGuardado(false);
  }
  function toggleMultiple(clave: string, valor: number) {
    setResp((p) => {
      const actual = Array.isArray(p[clave]) ? (p[clave] as number[]) : [];
      const nuevo = actual.includes(valor)
        ? actual.filter((v) => v !== valor)
        : [...actual, valor];
      return { ...p, [clave]: nuevo };
    });
    setGuardado(false);
  }
  function setNumero(clave: string, valor: string) {
    setResp((p) => ({ ...p, [clave]: valor === "" ? null : Number(valor) }));
    setGuardado(false);
  }

  async function guardar() {
    setGuardando(true);
    const res = await fetch(`/api/tests/${testId}/registro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        total: resultado.total,
        nivel: resultado.nivel,
        etiquetaResultado: resultado.titulo,
        respuestasJson: JSON.stringify(resp),
        pacienteRef: pacienteRef.trim() || null,
      }),
    });
    setGuardando(false);
    if (res.ok) {
      setGuardado(true);
      router.refresh();
    }
  }

  function limpiar() {
    setResp({});
    setGuardado(false);
    setPacienteRef("");
  }

  return (
    <div className="space-y-4">
      {/* Resultado fijo arriba */}
      <div className="card p-4 sticky top-14 z-[5]">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-slatey">Puntaje</p>
            <p className="text-3xl font-bold text-navy leading-none">
              {resultado.total}
              <span className="text-base text-slatey font-semibold"> / {resultado.maximo}</span>
            </p>
          </div>
          <span className={`nivel-badge nivel-${resultado.nivel}`}>
            {NIVEL_LABEL[resultado.nivel] ?? resultado.nivel}
          </span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-mist overflow-hidden">
          <div
            className={`h-full nivel-bar-${resultado.nivel}`}
            style={{
              width: `${Math.max(4, Math.min(100, (resultado.total / (resultado.maximo || 1)) * 100))}%`,
            }}
          />
        </div>
        <p className="mt-2 font-semibold text-ink text-sm">{resultado.titulo}</p>
        {resultado.detalle && (
          <p className="text-sm text-slatey mt-1">{resultado.detalle}</p>
        )}
        {!resultado.completo && (
          <p className="text-xs text-slatey mt-2">
            Faltan ítems por responder — el puntaje es parcial.
          </p>
        )}
      </div>

      {/* Ítems */}
      <div className="space-y-3">
        {def.items.map((item, i) => (
          <div key={item.clave} className="card-flat p-3">
            <p className="font-semibold text-ink text-sm">
              {i + 1}. {item.enunciado}
            </p>
            {item.ayuda && (
              <p className="text-xs text-slatey mt-0.5">{item.ayuda}</p>
            )}

            {item.tipo === "NUMERICO" ? (
              <input
                type="number"
                inputMode="numeric"
                className="input mt-2"
                min={item.min}
                max={item.max}
                step={item.paso ?? 1}
                value={
                  resp[item.clave] == null ? "" : String(resp[item.clave])
                }
                onChange={(e) => setNumero(item.clave, e.target.value)}
              />
            ) : (
              <div className="mt-2 flex flex-col gap-1.5">
                {(item.opciones ?? []).map((o) => {
                  const seleccionada =
                    item.tipo === "MULTIPLE"
                      ? Array.isArray(resp[item.clave]) &&
                        (resp[item.clave] as number[]).includes(o.valor)
                      : resp[item.clave] === o.valor;
                  return (
                    <button
                      key={o.etiqueta}
                      type="button"
                      onClick={() =>
                        item.tipo === "MULTIPLE"
                          ? toggleMultiple(item.clave, o.valor)
                          : setUnica(item.clave, o.valor)
                      }
                      className={`text-left text-sm rounded-lg border px-3 py-2 flex items-center justify-between gap-2 ${
                        seleccionada
                          ? "border-teal bg-teal/10 text-navy font-semibold"
                          : "border-line bg-white text-ink"
                      }`}
                    >
                      <span>{o.etiqueta}</span>
                      <span className="text-xs text-slatey">
                        {o.valor > 0 ? `+${o.valor}` : o.valor}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Guardar */}
      <div className="card-flat p-3 space-y-2">
        <label className="label">
          Referencia del paciente (opcional, sin datos identificatorios)
        </label>
        <input
          className="input"
          placeholder="Ej. M.G., 78 años"
          value={pacienteRef}
          onChange={(e) => setPacienteRef(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={guardar}
            className="btn btn-primary flex-1"
            disabled={guardando}
          >
            {guardado ? "Guardado ✓" : guardando ? "Guardando…" : "Guardar en historial"}
          </button>
          <button onClick={limpiar} className="btn btn-ghost">
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
}

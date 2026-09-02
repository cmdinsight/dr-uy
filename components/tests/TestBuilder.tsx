"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CAT_TEST } from "@/lib/labels";

type Opcion = { etiqueta: string; valor: number };
type Item = {
  enunciado: string;
  tipo: "UNICA" | "MULTIPLE" | "NUMERICO";
  opciones: Opcion[];
  min?: number;
  max?: number;
};
type Rango = {
  min: number;
  max: number;
  nivel: "INFO" | "LEVE" | "MODERADO" | "GRAVE";
  titulo: string;
  detalle: string;
};

const nuevoItem = (): Item => ({
  enunciado: "",
  tipo: "UNICA",
  opciones: [
    { etiqueta: "No", valor: 0 },
    { etiqueta: "Sí", valor: 1 },
  ],
});

export function TestBuilder() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("OTROS");
  const [resumen, setResumen] = useState("");
  const [referencia, setReferencia] = useState("");
  const [modoCalculo, setModoCalculo] = useState<"SUMA" | "REGLA_CUALQUIERA_POSITIVO">("SUMA");
  const [items, setItems] = useState<Item[]>([nuevoItem()]);
  const [rangos, setRangos] = useState<Rango[]>([
    { min: 0, max: 0, nivel: "LEVE", titulo: "", detalle: "" },
  ]);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  function updItem(i: number, patch: Partial<Item>) {
    setItems((p) => p.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  }
  function updOpcion(ii: number, oi: number, patch: Partial<Opcion>) {
    setItems((p) =>
      p.map((it, idx) =>
        idx === ii
          ? { ...it, opciones: it.opciones.map((o, j) => (j === oi ? { ...o, ...patch } : o)) }
          : it,
      ),
    );
  }
  function updRango(i: number, patch: Partial<Rango>) {
    setRangos((p) => p.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  }

  async function guardar() {
    setError(null);
    if (!nombre.trim()) return setError("Poné un nombre.");
    setCargando(true);
    const res = await fetch("/api/tests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, categoria, resumen, referencia, modoCalculo, items, rangos }),
    });
    const data = await res.json().catch(() => ({}));
    setCargando(false);
    if (!res.ok) return setError(data.error || "No se pudo crear el test.");
    router.push(`/app/tests/${data.slug}`);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="card-flat p-3 space-y-3">
        <div>
          <label className="label">Nombre del test</label>
          <input className="input" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Categoría</label>
            <select className="select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              {Object.entries(CAT_TEST).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Cálculo</label>
            <select
              className="select"
              value={modoCalculo}
              onChange={(e) => setModoCalculo(e.target.value as typeof modoCalculo)}
            >
              <option value="SUMA">Suma de puntos</option>
              <option value="REGLA_CUALQUIERA_POSITIVO">Regla (cuenta ítems positivos)</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label">Resumen (opcional)</label>
          <input className="input" value={resumen} onChange={(e) => setResumen(e.target.value)} />
        </div>
        <div>
          <label className="label">Referencia / fuente (opcional)</label>
          <input className="input" value={referencia} onChange={(e) => setReferencia(e.target.value)} />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slatey uppercase tracking-wide">Ítems</h2>
        {items.map((it, i) => (
          <div key={i} className="card-flat p-3 space-y-2">
            <div className="flex gap-2">
              <input
                className="input"
                placeholder={`Ítem ${i + 1}`}
                value={it.enunciado}
                onChange={(e) => updItem(i, { enunciado: e.target.value })}
              />
              <button
                className="btn btn-ghost !px-2"
                onClick={() => setItems((p) => p.filter((_, idx) => idx !== i))}
                aria-label="Quitar ítem"
              >
                ✕
              </button>
            </div>
            <select
              className="select"
              value={it.tipo}
              onChange={(e) => updItem(i, { tipo: e.target.value as Item["tipo"] })}
            >
              <option value="UNICA">Opción única</option>
              <option value="MULTIPLE">Opción múltiple (suma)</option>
              <option value="NUMERICO">Valor numérico</option>
            </select>

            {it.tipo === "NUMERICO" ? (
              <div className="grid grid-cols-2 gap-2">
                <input
                  className="input"
                  type="number"
                  placeholder="Mín"
                  value={it.min ?? 0}
                  onChange={(e) => updItem(i, { min: Number(e.target.value) })}
                />
                <input
                  className="input"
                  type="number"
                  placeholder="Máx"
                  value={it.max ?? 10}
                  onChange={(e) => updItem(i, { max: Number(e.target.value) })}
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                {it.opciones.map((o, oi) => (
                  <div key={oi} className="flex gap-2">
                    <input
                      className="input"
                      placeholder="Etiqueta"
                      value={o.etiqueta}
                      onChange={(e) => updOpcion(i, oi, { etiqueta: e.target.value })}
                    />
                    <input
                      className="input !w-20"
                      type="number"
                      value={o.valor}
                      onChange={(e) => updOpcion(i, oi, { valor: Number(e.target.value) })}
                    />
                    <button
                      className="btn btn-ghost !px-2"
                      onClick={() =>
                        updItem(i, { opciones: it.opciones.filter((_, j) => j !== oi) })
                      }
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  className="text-sm text-navy font-semibold"
                  onClick={() => updItem(i, { opciones: [...it.opciones, { etiqueta: "", valor: 0 }] })}
                >
                  + Opción
                </button>
              </div>
            )}
          </div>
        ))}
        <button className="btn btn-ghost btn-block" onClick={() => setItems((p) => [...p, nuevoItem()])}>
          + Agregar ítem
        </button>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slatey uppercase tracking-wide">
          Interpretación por rango de puntaje
        </h2>
        {rangos.map((r, i) => (
          <div key={i} className="card-flat p-3 space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <input className="input" type="number" placeholder="Desde" value={r.min} onChange={(e) => updRango(i, { min: Number(e.target.value) })} />
              <input className="input" type="number" placeholder="Hasta" value={r.max} onChange={(e) => updRango(i, { max: Number(e.target.value) })} />
              <select className="select" value={r.nivel} onChange={(e) => updRango(i, { nivel: e.target.value as Rango["nivel"] })}>
                <option value="INFO">Informativo</option>
                <option value="LEVE">Bajo</option>
                <option value="MODERADO">Intermedio</option>
                <option value="GRAVE">Alto</option>
              </select>
            </div>
            <input className="input" placeholder="Título del resultado" value={r.titulo} onChange={(e) => updRango(i, { titulo: e.target.value })} />
            <textarea className="textarea" rows={2} placeholder="Detalle / conducta sugerida" value={r.detalle} onChange={(e) => updRango(i, { detalle: e.target.value })} />
            <button className="text-sm text-nivel-grave font-semibold" onClick={() => setRangos((p) => p.filter((_, idx) => idx !== i))}>
              Quitar rango
            </button>
          </div>
        ))}
        <button
          className="btn btn-ghost btn-block"
          onClick={() => setRangos((p) => [...p, { min: 0, max: 0, nivel: "MODERADO", titulo: "", detalle: "" }])}
        >
          + Agregar rango
        </button>
      </div>

      {error && <p className="text-sm text-nivel-grave font-medium">{error}</p>}
      <button className="btn btn-primary btn-block" onClick={guardar} disabled={cargando}>
        {cargando ? "Creando…" : "Crear test"}
      </button>
    </div>
  );
}

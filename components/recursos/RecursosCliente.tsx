"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { RecursoListado } from "@/lib/data/recursos";
import { CAT_RECURSO } from "@/lib/labels";
import { BotonFavorito } from "@/components/BotonFavorito";

const CATS = Object.keys(CAT_RECURSO);

export function RecursosCliente({ recursos }: { recursos: RecursoListado[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [form, setForm] = useState<null | {
    id?: string;
    titulo: string;
    url: string;
    categoria: string;
    descripcion: string;
  }>(null);

  const grupos = useMemo(() => {
    const term = q.trim().toLowerCase();
    const filtrados = recursos.filter(
      (r) =>
        !term ||
        r.titulo.toLowerCase().includes(term) ||
        (r.descripcion ?? "").toLowerCase().includes(term),
    );
    const map = new Map<string, RecursoListado[]>();
    for (const r of filtrados) {
      if (!map.has(r.categoria)) map.set(r.categoria, []);
      map.get(r.categoria)!.push(r);
    }
    return map;
  }, [recursos, q]);

  async function guardar() {
    if (!form) return;
    const res = await fetch(
      form.id ? `/api/recursos/${form.id}` : "/api/recursos",
      {
        method: form.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      },
    );
    if (res.ok) {
      setForm(null);
      router.refresh();
    }
  }

  async function borrar(id: string) {
    await fetch(`/api/recursos/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <input className="input" placeholder="Buscar recurso…" value={q} onChange={(e) => setQ(e.target.value)} />
      <button
        className="btn btn-primary btn-block"
        onClick={() => setForm({ titulo: "", url: "", categoria: "OTROS", descripcion: "" })}
      >
        + Agregar enlace
      </button>

      {form && (
        <div className="card p-4 space-y-2">
          <input className="input" placeholder="Título" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
          <input className="input" placeholder="https://…" inputMode="url" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
          <select className="select" value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
            {CATS.map((c) => (
              <option key={c} value={c}>{CAT_RECURSO[c]}</option>
            ))}
          </select>
          <input className="input" placeholder="Descripción (opcional)" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
          <div className="flex gap-2">
            <button className="btn btn-primary flex-1" onClick={guardar}>Guardar</button>
            <button className="btn btn-ghost" onClick={() => setForm(null)}>Cancelar</button>
          </div>
        </div>
      )}

      {Array.from(grupos.entries()).map(([cat, items]) => (
        <div key={cat}>
          <h2 className="text-xs font-bold text-slatey uppercase tracking-wide mb-2">
            {CAT_RECURSO[cat] ?? cat}
          </h2>
          <div className="space-y-2">
            {items.map((r) => (
              <div key={r.id} className="card-flat p-3 flex items-start gap-3">
                <BotonFavorito tipo="RECURSO" ref={r.id} inicial={r.favorito} className="mt-0.5" />
                <div className="flex-1 min-w-0">
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy text-sm">
                    {r.titulo} ↗
                  </a>
                  {r.descripcion && <p className="text-xs text-slatey">{r.descripcion}</p>}
                  {r.propio && (
                    <div className="flex gap-3 mt-1.5 text-xs">
                      <button
                        className="text-navy font-semibold"
                        onClick={() =>
                          setForm({
                            id: r.id,
                            titulo: r.titulo,
                            url: r.url,
                            categoria: r.categoria,
                            descripcion: r.descripcion ?? "",
                          })
                        }
                      >
                        Editar
                      </button>
                      <button className="text-nivel-grave font-semibold" onClick={() => borrar(r.id)}>
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

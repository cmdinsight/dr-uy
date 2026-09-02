"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { AlgoritmoListado } from "@/lib/data/algoritmos";
import { CAT_ALGORITMO } from "@/lib/labels";
import { BotonFavorito } from "@/components/BotonFavorito";

export function CatalogoAlgoritmos({ algos }: { algos: AlgoritmoListado[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");

  const categorias = useMemo(
    () => Array.from(new Set(algos.map((a) => a.categoria))),
    [algos],
  );

  const filtrados = useMemo(() => {
    const term = q.trim().toLowerCase();
    return algos.filter((a) => {
      if (cat && a.categoria !== cat) return false;
      if (!term) return true;
      return (
        a.titulo.toLowerCase().includes(term) ||
        a.resumen.toLowerCase().includes(term)
      );
    });
  }, [algos, q, cat]);

  return (
    <div className="space-y-4">
      <input
        className="input"
        placeholder="Buscar protocolo…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        <button onClick={() => setCat("")} className={`chip whitespace-nowrap ${cat === "" ? "!bg-navy !text-white" : ""}`}>
          Todos
        </button>
        {categorias.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`chip whitespace-nowrap ${cat === c ? "!bg-navy !text-white" : ""}`}>
            {CAT_ALGORITMO[c] ?? c}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtrados.map((a) => (
          <div key={a.id} className="card-flat p-3 flex items-start gap-3">
            <BotonFavorito tipo="ALGORITMO" refId={a.id} inicial={a.favorito} className="mt-0.5" />
            <Link href={`/app/algoritmos/${a.slug}`} className="flex-1 min-w-0">
              <p className="font-semibold text-ink text-sm flex items-center gap-2">
                {a.titulo}
                {a.propio && <span className="chip !py-0.5 !text-[10px]">Propio</span>}
              </p>
              <p className="text-xs text-slatey line-clamp-2">{a.resumen}</p>
              <span className="chip mt-1 !py-0.5 !text-[10px]">{CAT_ALGORITMO[a.categoria] ?? a.categoria}</span>
            </Link>
          </div>
        ))}
        {filtrados.length === 0 && (
          <p className="text-sm text-slatey">No hay protocolos que coincidan.</p>
        )}
      </div>
    </div>
  );
}

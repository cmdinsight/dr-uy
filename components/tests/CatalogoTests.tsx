"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { TestListado } from "@/lib/data/tests";
import { CAT_TEST } from "@/lib/labels";
import { BotonFavorito } from "@/components/BotonFavorito";

export function CatalogoTests({ tests }: { tests: TestListado[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("");

  const categorias = useMemo(
    () => Array.from(new Set(tests.map((t) => t.categoria))),
    [tests],
  );

  const filtrados = useMemo(() => {
    const term = q.trim().toLowerCase();
    return tests.filter((t) => {
      if (cat && t.categoria !== cat) return false;
      if (!term) return true;
      return (
        t.nombre.toLowerCase().includes(term) ||
        t.resumen.toLowerCase().includes(term)
      );
    });
  }, [tests, q, cat]);

  const favoritos = filtrados.filter((t) => t.favorito);
  const porCategoria = useMemo(() => {
    const map = new Map<string, TestListado[]>();
    for (const t of filtrados) {
      if (!map.has(t.categoria)) map.set(t.categoria, []);
      map.get(t.categoria)!.push(t);
    }
    return map;
  }, [filtrados]);

  return (
    <div className="space-y-4">
      <input
        className="input"
        placeholder="Buscar test…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        <button
          onClick={() => setCat("")}
          className={`chip whitespace-nowrap ${cat === "" ? "!bg-navy !text-white" : ""}`}
        >
          Todas
        </button>
        {categorias.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`chip whitespace-nowrap ${cat === c ? "!bg-navy !text-white" : ""}`}
          >
            {CAT_TEST[c] ?? c}
          </button>
        ))}
      </div>

      {favoritos.length > 0 && !cat && !q && (
        <Grupo titulo="Favoritos" items={favoritos} />
      )}

      {Array.from(porCategoria.entries()).map(([c, items]) => (
        <Grupo key={c} titulo={CAT_TEST[c] ?? c} items={items} />
      ))}

      {filtrados.length === 0 && (
        <p className="text-sm text-slatey">No hay test que coincidan.</p>
      )}
    </div>
  );
}

function Grupo({ titulo, items }: { titulo: string; items: TestListado[] }) {
  return (
    <div>
      <h2 className="text-xs font-bold text-slatey uppercase tracking-wide mb-2">
        {titulo}
      </h2>
      <div className="space-y-2">
        {items.map((t) => (
          <div key={t.id} className="card-flat p-3 flex items-start gap-3">
            <BotonFavorito tipo="TEST" refId={t.id} inicial={t.favorito} className="mt-0.5" />
            <Link href={`/app/tests/${t.slug}`} className="flex-1 min-w-0">
              <p className="font-semibold text-ink text-sm flex items-center gap-2">
                {t.nombre}
                {t.propio && <span className="chip !py-0.5 !text-[10px]">Propio</span>}
              </p>
              <p className="text-xs text-slatey line-clamp-2">{t.resumen}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

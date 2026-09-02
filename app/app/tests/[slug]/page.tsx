import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth";
import { getTestParaUsuario, historialTest } from "@/lib/data/tests";
import { TestRunner } from "@/components/tests/TestRunner";
import { BotonFavorito } from "@/components/BotonFavorito";
import { CAT_TEST, NIVEL_LABEL } from "@/lib/labels";
import { EliminarTest } from "@/components/tests/EliminarTest";

export const dynamic = "force-dynamic";

export default async function TestDetalle({
  params,
}: {
  params: { slug: string };
}) {
  const s = await requireSession();
  const t = await getTestParaUsuario(params.slug, s.sub);
  if (!t) notFound();

  const historial = await historialTest(s.sub, t.id);

  return (
    <div className="space-y-4">
      <Link href="/app/tests" className="text-sm text-slatey">
        ← Test clínicos
      </Link>

      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="chip">{CAT_TEST[t.def.categoria] ?? t.def.categoria}</span>
            {t.propio && <span className="chip">Test propio</span>}
          </div>
          <h1 className="text-xl font-bold text-navy mt-1">{t.def.nombre}</h1>
          <p className="text-sm text-slatey mt-1">{t.def.resumen}</p>
        </div>
        <BotonFavorito tipo="TEST" ref={t.id} inicial={t.favorito} />
      </div>

      <TestRunner testId={t.id} def={t.def} />

      <div className="card-flat p-3 text-xs text-slatey space-y-1">
        {t.def.poblacion && (
          <p>
            <strong className="text-ink">Población:</strong> {t.def.poblacion}
          </p>
        )}
        <p>
          <strong className="text-ink">Referencia:</strong> {t.def.referencia}
        </p>
      </div>

      {historial.length > 0 && (
        <div>
          <h2 className="text-xs font-bold text-slatey uppercase tracking-wide mb-2">
            Historial
          </h2>
          <div className="space-y-1.5">
            {historial.map((h) => (
              <div key={h.id} className="card-flat p-2.5 flex items-center justify-between text-sm">
                <div>
                  <span className="font-semibold text-ink">{h.total}</span>{" "}
                  <span className="text-slatey">· {NIVEL_LABEL[h.nivel] ?? h.nivel}</span>
                  {h.pacienteRef && (
                    <span className="text-slatey"> · {h.pacienteRef}</span>
                  )}
                </div>
                <span className="text-xs text-slatey">
                  {new Date(h.createdAt).toLocaleDateString("es-UY")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {t.propio && <EliminarTest testId={t.id} />}
    </div>
  );
}

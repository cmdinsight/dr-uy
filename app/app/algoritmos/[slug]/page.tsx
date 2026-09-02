import Link from "next/link";
import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth";
import { getAlgoritmoParaUsuario } from "@/lib/data/algoritmos";
import { MarkdownLite } from "@/components/MarkdownLite";
import { VisorImagen } from "@/components/algoritmos/VisorImagen";
import { BotonCompartir } from "@/components/algoritmos/BotonCompartir";
import { BotonFavorito } from "@/components/BotonFavorito";
import { EliminarAlgoritmo } from "@/components/algoritmos/EliminarAlgoritmo";
import { CAT_ALGORITMO } from "@/lib/labels";

export const dynamic = "force-dynamic";

export default async function AlgoritmoDetalle({
  params,
}: {
  params: { slug: string };
}) {
  const s = await requireSession();
  const a = await getAlgoritmoParaUsuario(params.slug, s.sub);
  if (!a) notFound();

  return (
    <div className="space-y-4">
      <Link href="/app/algoritmos" className="text-sm text-slatey">
        ← Algoritmos
      </Link>

      <div className="flex items-start gap-3">
        <div className="flex-1">
          <span className="chip">{CAT_ALGORITMO[a.categoria] ?? a.categoria}</span>
          <h1 className="text-xl font-bold text-navy mt-1">{a.titulo}</h1>
          <p className="text-sm text-slatey mt-1">{a.resumen}</p>
        </div>
        <BotonFavorito tipo="ALGORITMO" ref={a.id} inicial={a.favorito} />
      </div>

      <div className="flex gap-2">
        <BotonCompartir titulo={a.titulo} />
      </div>

      {a.imagenId && (
        <VisorImagen src={`/api/imagenes/${a.imagenId}`} alt={a.titulo} />
      )}

      {a.contenidoMd && (
        <div className="card p-4">
          <MarkdownLite>{a.contenidoMd}</MarkdownLite>
        </div>
      )}

      {a.fuente && (
        <p className="text-xs text-slatey">
          <strong className="text-ink">Fuente:</strong> {a.fuente}
        </p>
      )}

      {a.propio && <EliminarAlgoritmo id={a.id} />}
    </div>
  );
}

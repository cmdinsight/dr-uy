import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { algoritmosVisibles } from "@/lib/data/algoritmos";
import { CatalogoAlgoritmos } from "@/components/algoritmos/CatalogoAlgoritmos";

export const dynamic = "force-dynamic";

export default async function AlgoritmosPage() {
  const s = await requireSession();
  const algos = await algoritmosVisibles(s.sub);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy">Algoritmos</h1>
        <Link href="/app/algoritmos/nuevo" className="btn btn-ghost !py-2 !px-3 text-sm">
          + Nuevo
        </Link>
      </div>
      <CatalogoAlgoritmos algos={algos} />
    </div>
  );
}

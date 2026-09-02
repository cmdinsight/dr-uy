import { requireSession } from "@/lib/auth";
import { recursosVisibles } from "@/lib/data/recursos";
import { RecursosCliente } from "@/components/recursos/RecursosCliente";

export const dynamic = "force-dynamic";

export default async function RecursosPage() {
  const s = await requireSession();
  const recursos = await recursosVisibles(s.sub);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-navy">Recursos</h1>
      <RecursosCliente recursos={recursos} />
    </div>
  );
}

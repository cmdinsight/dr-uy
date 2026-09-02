import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { AlgoritmoNuevo } from "@/components/algoritmos/AlgoritmoNuevo";

export const dynamic = "force-dynamic";

export default async function NuevoAlgoritmo() {
  await requireSession();
  return (
    <div className="space-y-4">
      <Link href="/app/algoritmos" className="text-sm text-slatey">
        ← Algoritmos
      </Link>
      <h1 className="text-2xl font-bold text-navy">Nuevo protocolo propio</h1>
      <p className="text-sm text-slatey">
        Subí el diagrama de tu servicio y sumale un texto de apoyo. Queda privado
        en tu cuenta.
      </p>
      <AlgoritmoNuevo />
    </div>
  );
}

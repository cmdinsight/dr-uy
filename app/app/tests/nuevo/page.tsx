import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { TestBuilder } from "@/components/tests/TestBuilder";

export const dynamic = "force-dynamic";

export default async function NuevoTest() {
  await requireSession();
  return (
    <div className="space-y-4">
      <Link href="/app/tests" className="text-sm text-slatey">
        ← Test clínicos
      </Link>
      <h1 className="text-2xl font-bold text-navy">Nuevo test propio</h1>
      <p className="text-sm text-slatey">
        Armá un test con tus ítems y puntos de corte. Queda privado en tu cuenta.
      </p>
      <TestBuilder />
    </div>
  );
}

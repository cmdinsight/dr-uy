import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { testsVisibles } from "@/lib/data/tests";
import { CatalogoTests } from "@/components/tests/CatalogoTests";

export const dynamic = "force-dynamic";

export default async function TestsPage() {
  const s = await requireSession();
  const tests = await testsVisibles(s.sub);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy">Test clínicos</h1>
        <Link href="/app/tests/nuevo" className="btn btn-ghost !py-2 !px-3 text-sm">
          + Nuevo
        </Link>
      </div>
      <CatalogoTests tests={tests} />
    </div>
  );
}

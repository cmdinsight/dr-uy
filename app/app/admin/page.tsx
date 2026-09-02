import Link from "next/link";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SeedButton } from "@/components/admin/SeedButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireRole("ADMIN");

  const [contactos, tests, algos, recursos, version, usuarios] = await Promise.all([
    prisma.contactoBase.count(),
    prisma.testClinico.count({ where: { esBase: true } }),
    prisma.algoritmo.count({ where: { esBase: true } }),
    prisma.recurso.count({ where: { esBase: true } }),
    prisma.contenidoVersion.findFirst({ orderBy: { publicadoEn: "desc" } }),
    prisma.usuario.count(),
  ]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-navy">Administración</h1>

      <div className="card p-4 space-y-3">
        <h2 className="font-bold text-navy">Contenido base</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Stat label="Contactos" value={contactos} />
          <Stat label="Test clínicos" value={tests} />
          <Stat label="Algoritmos" value={algos} />
          <Stat label="Recursos" value={recursos} />
        </div>
        {version ? (
          <p className="text-xs text-slatey">
            Última versión: v{version.etiqueta} ·{" "}
            {new Date(version.publicadoEn).toLocaleDateString("es-UY")}
          </p>
        ) : (
          <p className="text-xs text-nivel-mod">
            Todavía no se sembró el contenido base.
          </p>
        )}
        <SeedButton />
        <p className="text-xs text-slatey">
          El sembrado es idempotente (por slug): actualiza lo existente y agrega lo
          nuevo, sin tocar el contenido de los usuarios.
        </p>
      </div>

      <div className="card p-4">
        <h2 className="font-bold text-navy">Usuarios</h2>
        <p className="text-sm text-slatey mt-1">{usuarios} cuenta(s) registrada(s).</p>
      </div>

      <Link href="/app" className="text-sm text-slatey">
        ← Volver a la app
      </Link>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="card-flat p-3">
      <p className="text-2xl font-bold text-navy leading-none">{value}</p>
      <p className="text-xs text-slatey mt-1">{label}</p>
    </div>
  );
}

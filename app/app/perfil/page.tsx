import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PerfilCliente } from "@/components/perfil/PerfilCliente";
import { DESCARGO_CORTO } from "@/lib/descargo";

export const dynamic = "force-dynamic";

export default async function PerfilPage() {
  const s = await requireSession();
  const u = await prisma.usuario.findUnique({ where: { id: s.sub } });
  if (!u) return null;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-navy">Perfil</h1>
      <PerfilCliente
        usuario={{
          nombre: u.nombre,
          email: u.email,
          especialidad: u.especialidad,
          institucion: u.institucion,
          region: u.region,
          emailVerificado: Boolean(u.emailVerificadoEn),
        }}
      />
      <p className="text-xs text-slatey">{DESCARGO_CORTO}</p>
    </div>
  );
}

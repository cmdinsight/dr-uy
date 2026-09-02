import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Marca } from "@/components/Logo";
import { BottomNav } from "@/components/app/BottomNav";
import { DescargoGate } from "@/components/app/DescargoGate";
import { RegistrarSW } from "@/components/RegistrarSW";
import { DESARROLLADA_POR_LARGO, CMD_TECH_URL } from "@/lib/descargo";

export const dynamic = "force-dynamic";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const s = await requireSession();
  const u = await prisma.usuario.findUnique({
    where: { id: s.sub },
    select: { aceptoDescargoEn: true, emailVerificadoEn: true, rol: true },
  });

  const debeAceptar = !u?.aceptoDescargoEn;

  return (
    <div className="min-h-screen pb-16">
      <RegistrarSW />
      <header className="sticky top-0 z-10 border-b border-line bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-content flex items-center justify-between h-14 px-4">
          <Link href="/app">
            <Marca size={30} />
          </Link>
          <div className="flex items-center gap-3">
            {u?.rol === "ADMIN" && (
              <Link href="/app/admin" className="text-sm font-semibold text-navy">
                Admin
              </Link>
            )}
            <Link href="/app/perfil" className="text-sm font-semibold text-slatey">
              Perfil
            </Link>
          </div>
        </div>
        {!u?.emailVerificadoEn && (
          <div className="bg-nivel-mod/10 text-[13px] text-nivel-mod px-4 py-1.5 text-center">
            Confirmá tu correo desde{" "}
            <Link href="/app/perfil" className="underline font-semibold">
              tu perfil
            </Link>
            .
          </div>
        )}
      </header>

      <main className="mx-auto max-w-content px-4 py-4">{children}</main>

      <footer className="mx-auto max-w-content px-4 pb-6 pt-2 text-center text-[11px] text-slatey">
        Desarrollada por{" "}
        <a
          href={CMD_TECH_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {DESARROLLADA_POR_LARGO}
        </a>
        . Herramienta de apoyo — no reemplaza el juicio clínico.
      </footer>

      <BottomNav />
      {debeAceptar && <DescargoGate />}
    </div>
  );
}

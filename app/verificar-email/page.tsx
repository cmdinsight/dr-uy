import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Marca } from "@/components/Logo";

export const dynamic = "force-dynamic";

export default async function VerificarEmail({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;
  let estado: "ok" | "invalido" | "sin-token" = "sin-token";

  if (token) {
    const u = await prisma.usuario.findFirst({ where: { verifToken: token } });
    if (u) {
      await prisma.usuario.update({
        where: { id: u.id },
        data: { emailVerificadoEn: new Date(), verifToken: null },
      });
      estado = "ok";
    } else {
      estado = "invalido";
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
      <Marca />
      {estado === "ok" && (
        <>
          <h1 className="text-2xl font-bold text-navy">Correo confirmado</h1>
          <p className="text-slatey">Ya podés usar todas las funciones.</p>
        </>
      )}
      {estado === "invalido" && (
        <>
          <h1 className="text-2xl font-bold text-navy">Enlace no válido</h1>
          <p className="text-slatey">
            El enlace expiró o ya se usó. Pedí uno nuevo desde tu perfil.
          </p>
        </>
      )}
      {estado === "sin-token" && (
        <h1 className="text-2xl font-bold text-navy">Falta el enlace de verificación</h1>
      )}
      <Link href="/app" className="btn btn-primary">
        Ir a la app
      </Link>
    </div>
  );
}

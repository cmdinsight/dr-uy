import { redirect } from "next/navigation";
import { hayUsuarios } from "@/lib/data/usuarios";
import { Marca } from "@/components/Logo";
import { FormSetup } from "@/components/auth/FormSetup";

export const dynamic = "force-dynamic";

export default async function Setup() {
  if (await hayUsuarios()) redirect("/acceder");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="wrap-narrow w-full">
        <div className="flex justify-center mb-6">
          <Marca />
        </div>
        <div className="card p-6">
          <h1 className="text-xl font-bold text-navy mb-1">Configuración inicial</h1>
          <p className="text-sm text-slatey mb-4">
            Creá el primer usuario administrador. Desde su cuenta vas a poder
            sembrar el contenido clínico base.
          </p>
          <FormSetup />
        </div>
      </div>
    </div>
  );
}

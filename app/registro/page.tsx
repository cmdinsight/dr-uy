import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { Marca } from "@/components/Logo";
import { FormRegistro } from "@/components/auth/FormRegistro";
import { DESCARGO_CORTO } from "@/lib/descargo";

export const dynamic = "force-dynamic";

export default async function Registro() {
  const s = await getSession();
  if (s) redirect("/app");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="wrap-narrow w-full">
        <div className="flex justify-center mb-6">
          <Link href="/">
            <Marca />
          </Link>
        </div>
        <div className="card p-6">
          <h1 className="text-xl font-bold text-navy mb-1">Crear cuenta</h1>
          <p className="text-sm text-slatey mb-4">
            Para profesionales de la salud. Es gratis.
          </p>
          <FormRegistro />
          <p className="text-xs text-slatey mt-4">{DESCARGO_CORTO}</p>
        </div>
        <p className="text-center text-sm text-slatey mt-4">
          ¿Ya tenés cuenta?{" "}
          <Link href="/acceder" className="text-navy font-semibold underline">
            Ingresar
          </Link>
        </p>
      </div>
    </div>
  );
}

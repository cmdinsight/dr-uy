import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { hayUsuarios } from "@/lib/data/usuarios";
import { Marca } from "@/components/Logo";
import { FormAcceder } from "@/components/auth/FormAcceder";

export const dynamic = "force-dynamic";

export default async function Acceder({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const s = await getSession();
  if (s) redirect(searchParams.next || "/app");
  if (!(await hayUsuarios())) redirect("/setup");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="wrap-narrow w-full">
        <div className="flex justify-center mb-6">
          <Link href="/">
            <Marca />
          </Link>
        </div>
        <div className="card p-6">
          <h1 className="text-xl font-bold text-navy mb-1">Ingresar</h1>
          <p className="text-sm text-slatey mb-4">
            Accedé con tu correo y contraseña.
          </p>
          <FormAcceder next={searchParams.next} />
        </div>
        <p className="text-center text-sm text-slatey mt-4">
          ¿No tenés cuenta?{" "}
          <Link href="/registro" className="text-navy font-semibold underline">
            Crear una
          </Link>
        </p>
      </div>
    </div>
  );
}

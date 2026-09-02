import Link from "next/link";
import { Marca } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
      <Marca />
      <h1 className="text-2xl font-bold text-navy">Página no encontrada</h1>
      <p className="text-slatey">La dirección que buscás no existe o cambió.</p>
      <Link href="/app" className="btn btn-primary">
        Ir a la app
      </Link>
    </div>
  );
}

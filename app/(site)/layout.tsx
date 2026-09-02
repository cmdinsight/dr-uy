import Link from "next/link";
import { Marca } from "@/components/Logo";
import {
  DESCARGO_CORTO,
  DESARROLLADA_POR_LARGO,
  CMD_TECH_URL,
} from "@/lib/descargo";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-line bg-white/90 backdrop-blur sticky top-0 z-10">
        <div className="wrap flex items-center justify-between h-14">
          <Link href="/">
            <Marca />
          </Link>
          <nav className="flex items-center gap-2">
            <Link href="/acceder" className="btn btn-ghost !py-2 !px-3 text-sm">
              Ingresar
            </Link>
            <Link href="/registro" className="btn btn-primary !py-2 !px-3 text-sm">
              Crear cuenta
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-line bg-white">
        <div className="wrap py-10 text-sm text-slatey space-y-4">
          <Marca size={26} />
          <p className="max-w-content">{DESCARGO_CORTO}</p>
          <div className="border-t border-line pt-4 text-xs space-y-1.5">
            <p>
              DR.UY — Caja de Herramientas fue desarrollada por{" "}
              <a
                href={CMD_TECH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-navy underline"
              >
                {DESARROLLADA_POR_LARGO}
              </a>
              .
            </p>
            <p>
              Uruguay ·{" "}
              <Link href="/acceder" className="underline">
                Ingresar
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

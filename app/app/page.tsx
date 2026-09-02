import Link from "next/link";
import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { testsVisibles } from "@/lib/data/tests";
import { algoritmosVisibles } from "@/lib/data/algoritmos";
import { contactosEfectivos } from "@/lib/data/contactos";
import { CAT_TEST, CAT_ALGORITMO } from "@/lib/labels";

export const dynamic = "force-dynamic";

const MODULOS = [
  { href: "/app/contactos", titulo: "Contactos", desc: "Llamada directa a servicios y colegas" },
  { href: "/app/tests", titulo: "Test clínicos", desc: "Cálculo e interpretación al instante" },
  { href: "/app/algoritmos", titulo: "Algoritmos", desc: "Protocolos con diagrama y texto" },
  { href: "/app/recursos", titulo: "Recursos", desc: "Guías, vademécum y formación" },
];

export default async function AppHome() {
  const s = await requireSession();
  const [version, tests, algos, contactos] = await Promise.all([
    prisma.contenidoVersion.findFirst({ orderBy: { publicadoEn: "desc" } }),
    testsVisibles(s.sub),
    algoritmosVisibles(s.sub),
    contactosEfectivos(s.sub),
  ]);

  const testFav = tests.filter((t) => t.favorito);
  const algoFav = algos.filter((a) => a.favorito);
  const contFav = contactos.filter((c) => c.favorito);
  const hayFav = testFav.length + algoFav.length + contFav.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Hola, {s.nombre.split(" ")[0]}</h1>
        {version && (
          <p className="text-xs text-slatey mt-1">
            Contenido de referencia actualizado al{" "}
            {new Date(version.publicadoEn).toLocaleDateString("es-UY")} · v{version.etiqueta}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {MODULOS.map((m) => (
          <Link key={m.href} href={m.href} className="card p-4 active:scale-[0.99] transition">
            <h2 className="font-bold text-navy">{m.titulo}</h2>
            <p className="text-xs text-slatey mt-1">{m.desc}</p>
          </Link>
        ))}
      </div>

      <section>
        <h2 className="text-sm font-bold text-slatey uppercase tracking-wide mb-2">
          Favoritos
        </h2>
        {!hayFav && (
          <p className="text-sm text-slatey">
            Tocá la estrella en cualquier test, algoritmo o contacto para tenerlo acá.
          </p>
        )}
        <div className="space-y-2">
          {testFav.map((t) => (
            <Link key={t.id} href={`/app/tests/${t.slug}`} className="card-flat p-3 flex items-center justify-between">
              <span className="font-semibold text-ink text-sm">{t.nombre}</span>
              <span className="chip">{CAT_TEST[t.categoria]}</span>
            </Link>
          ))}
          {algoFav.map((a) => (
            <Link key={a.id} href={`/app/algoritmos/${a.slug}`} className="card-flat p-3 flex items-center justify-between">
              <span className="font-semibold text-ink text-sm">{a.titulo}</span>
              <span className="chip">{CAT_ALGORITMO[a.categoria]}</span>
            </Link>
          ))}
          {contFav.map((c) => (
            <a key={c.key} href={c.telefono ? `tel:${c.telefono}` : undefined} className="card-flat p-3 flex items-center justify-between">
              <span className="font-semibold text-ink text-sm">{c.nombre}</span>
              <span className="text-sm text-teal font-semibold">{c.telefono || "—"}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

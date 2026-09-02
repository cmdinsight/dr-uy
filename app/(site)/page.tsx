import Link from "next/link";
import { DESCARGO_TITULO, DESCARGO_PUNTOS } from "@/lib/descargo";

const MODULOS = [
  {
    n: 1,
    titulo: "Libreta de contactos",
    desc: "Emergencia móvil, toxicología, hemodinamia, laboratorio, colegas. Contactos de referencia + los tuyos, con llamada directa.",
  },
  {
    n: 2,
    titulo: "Test clínicos",
    desc: "Glasgow, qSOFA, NEWS2, Wells, HEART, CHA₂DS₂-VASc y la valoración geriátrica integral (Barthel, Lawton, Pfeiffer, Yesavage, MNA, Tinetti…). Cálculo e interpretación al instante.",
  },
  {
    n: 3,
    titulo: "Algoritmos y protocolos",
    desc: "Paro, anafilaxia, código ictus, SCA, sepsis, trauma. Diagrama con zoom y texto de apoyo, listo para consultar en segundos.",
  },
  {
    n: 4,
    titulo: "Recursos académicos",
    desc: "Guías del MSP, vademécum, calculadoras y formación continua, organizados y a mano.",
  },
];

export default function Landing() {
  return (
    <>
      <section className="wrap pt-12 pb-10 md:pt-16">
        <p className="eyebrow mb-3">Aplicación clínica · Uruguay</p>
        <h1 className="text-3xl md:text-5xl font-bold text-navy max-w-3xl">
          Todas tus herramientas clínicas, en un solo lugar.
        </h1>
        <p className="mt-4 text-lg text-slatey max-w-2xl">
          DR.UY — Caja de Herramientas reúne contactos, test clínicos, algoritmos
          y recursos para el médico general, de familia y emergencista. Contenido
          de referencia curado, y <strong>editable por cada profesional</strong>.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/registro" className="btn btn-primary btn-lg">
            Crear cuenta gratis
          </Link>
          <Link href="/acceder" className="btn btn-ghost btn-lg">
            Ya tengo cuenta
          </Link>
        </div>
      </section>

      <section className="wrap py-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {MODULOS.map((m) => (
            <div key={m.n} className="card p-5">
              <span className="chip mb-3">Módulo {m.n}</span>
              <h3 className="text-lg font-bold text-navy">{m.titulo}</h3>
              <p className="mt-1.5 text-sm text-slatey">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap py-10">
        <div className="card p-6 bg-mist">
          <h2 className="text-lg font-bold text-navy">{DESCARGO_TITULO}</h2>
          <ul className="mt-3 space-y-2 text-sm text-slatey list-disc pl-5">
            {DESCARGO_PUNTOS.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap pb-16">
        <div className="card p-6 text-center">
          <h2 className="text-xl font-bold text-navy">
            Empezá a usarla ahora
          </h2>
          <p className="mt-1 text-sm text-slatey">
            Se instala en el celular como una app. Funciona con poca señal.
          </p>
          <Link href="/registro" className="btn btn-accent btn-lg mt-4 inline-flex">
            Crear cuenta
          </Link>
        </div>
      </section>
    </>
  );
}

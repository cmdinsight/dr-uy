"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DESCARGO_TITULO,
  DESCARGO_PUNTOS,
  DESCARGO_ACEPTACION,
} from "@/lib/descargo";

export function DescargoGate() {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);

  async function aceptar() {
    setCargando(true);
    await fetch("/api/perfil/descargo", { method: "POST" });
    setCargando(false);
    router.refresh();
  }

  return (
    <div className="fixed inset-0 z-50 bg-ink/50 flex items-end sm:items-center justify-center p-3">
      <div className="card p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold text-navy">{DESCARGO_TITULO}</h2>
        <ul className="mt-3 space-y-2 text-sm text-slatey list-disc pl-5">
          {DESCARGO_PUNTOS.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm font-medium text-ink">{DESCARGO_ACEPTACION}</p>
        <button
          onClick={aceptar}
          className="btn btn-primary btn-block mt-4"
          disabled={cargando}
        >
          {cargando ? "Guardando…" : "Entiendo y acepto"}
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SeedButton() {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function sembrar() {
    setCargando(true);
    setMsg(null);
    const res = await fetch("/api/admin/seed", { method: "POST" });
    const data = await res.json().catch(() => ({}));
    setCargando(false);
    if (res.ok) {
      setMsg(
        `Listo: ${data.contactos} contactos, ${data.tests} test, ${data.algoritmos} algoritmos, ${data.recursos} recursos (v${data.version}).`,
      );
      router.refresh();
    } else {
      setMsg(data.error || "No se pudo sembrar.");
    }
  }

  return (
    <div className="space-y-2">
      <button className="btn btn-primary" onClick={sembrar} disabled={cargando}>
        {cargando ? "Sembrando…" : "Sembrar / actualizar contenido base"}
      </button>
      {msg && <p className="text-sm text-slatey">{msg}</p>}
    </div>
  );
}

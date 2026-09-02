"use client";

import { useState } from "react";

export function BotonCompartir({ titulo }: { titulo: string }) {
  const [copiado, setCopiado] = useState(false);

  async function compartir() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title: `${titulo} · DR.UY`, url });
        return;
      } catch {
        /* cancelado */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1800);
    } catch {
      /* nada */
    }
  }

  return (
    <button onClick={compartir} className="btn btn-ghost !py-2 !px-3 text-sm">
      {copiado ? "Enlace copiado ✓" : "Compartir"}
    </button>
  );
}

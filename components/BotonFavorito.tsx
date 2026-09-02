"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function BotonFavorito({
  tipo,
  ref: refId,
  inicial,
  className = "",
}: {
  tipo: "TEST" | "ALGORITMO" | "RECURSO" | "CONTACTO";
  ref: string;
  inicial: boolean;
  className?: string;
}) {
  const router = useRouter();
  const [fav, setFav] = useState(inicial);
  const [cargando, setCargando] = useState(false);

  async function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setCargando(true);
    setFav((v) => !v);
    await fetch("/api/favoritos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo, ref: refId }),
    }).catch(() => setFav((v) => !v));
    setCargando(false);
    router.refresh();
  }

  return (
    <button
      onClick={toggle}
      disabled={cargando}
      aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
      className={`shrink-0 ${fav ? "text-nivel-mod" : "text-slatey/50"} ${className}`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
        <path d="M12 17.3l-6.2 3.7 1.6-7L2 9.2l7.1-.6L12 2l2.9 6.6 7.1.6-5.4 4.8 1.6 7z" />
      </svg>
    </button>
  );
}

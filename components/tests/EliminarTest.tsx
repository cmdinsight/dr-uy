"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function EliminarTest({ testId }: { testId: string }) {
  const router = useRouter();
  const [confirmar, setConfirmar] = useState(false);
  const [cargando, setCargando] = useState(false);

  async function eliminar() {
    setCargando(true);
    const res = await fetch(`/api/tests/${testId}`, { method: "DELETE" });
    setCargando(false);
    if (res.ok) {
      router.push("/app/tests");
      router.refresh();
    }
  }

  if (!confirmar) {
    return (
      <button
        onClick={() => setConfirmar(true)}
        className="text-sm text-nivel-grave font-semibold"
      >
        Eliminar este test
      </button>
    );
  }
  return (
    <div className="card-flat p-3 space-y-2">
      <p className="text-sm text-ink">¿Eliminar el test y su historial? No se puede deshacer.</p>
      <div className="flex gap-2">
        <button onClick={eliminar} className="btn btn-primary !bg-nivel-grave flex-1" disabled={cargando}>
          {cargando ? "Eliminando…" : "Sí, eliminar"}
        </button>
        <button onClick={() => setConfirmar(false)} className="btn btn-ghost">
          Cancelar
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function EliminarAlgoritmo({ id }: { id: string }) {
  const router = useRouter();
  const [confirmar, setConfirmar] = useState(false);
  const [cargando, setCargando] = useState(false);

  async function eliminar() {
    setCargando(true);
    const res = await fetch(`/api/algoritmos/${id}`, { method: "DELETE" });
    setCargando(false);
    if (res.ok) {
      router.push("/app/algoritmos");
      router.refresh();
    }
  }

  if (!confirmar) {
    return (
      <button onClick={() => setConfirmar(true)} className="text-sm text-nivel-grave font-semibold">
        Eliminar este protocolo
      </button>
    );
  }
  return (
    <div className="card-flat p-3 flex gap-2">
      <button onClick={eliminar} className="btn btn-primary !bg-nivel-grave flex-1" disabled={cargando}>
        {cargando ? "Eliminando…" : "Sí, eliminar"}
      </button>
      <button onClick={() => setConfirmar(false)} className="btn btn-ghost">Cancelar</button>
    </div>
  );
}

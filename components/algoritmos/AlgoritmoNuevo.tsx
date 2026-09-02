"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CAT_ALGORITMO } from "@/lib/labels";

export function AlgoritmoNuevo() {
  const router = useRouter();
  const [f, setF] = useState({
    titulo: "",
    categoria: "MISCELANEAS",
    resumen: "",
    contenidoMd: "",
    fuente: "",
  });
  const [imagenDataUrl, setImagenDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  function onImagen(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setError("La imagen supera los 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImagenDataUrl(String(reader.result));
    reader.readAsDataURL(file);
  }

  async function guardar() {
    setError(null);
    if (!f.titulo.trim()) return setError("Poné un título.");
    setCargando(true);
    const res = await fetch("/api/algoritmos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...f, imagenDataUrl }),
    });
    const data = await res.json().catch(() => ({}));
    setCargando(false);
    if (!res.ok) return setError(data.error || "No se pudo crear el protocolo.");
    router.push(`/app/algoritmos/${data.slug}`);
    router.refresh();
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="label">Título</label>
        <input className="input" value={f.titulo} onChange={(e) => setF({ ...f, titulo: e.target.value })} />
      </div>
      <div>
        <label className="label">Categoría</label>
        <select className="select" value={f.categoria} onChange={(e) => setF({ ...f, categoria: e.target.value })}>
          {Object.entries(CAT_ALGORITMO).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label">Resumen</label>
        <input className="input" value={f.resumen} onChange={(e) => setF({ ...f, resumen: e.target.value })} />
      </div>
      <div>
        <label className="label">Diagrama / imagen (PNG, JPG, WEBP o SVG · máx 2 MB)</label>
        <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={onImagen} className="text-sm" />
        {imagenDataUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imagenDataUrl} alt="Vista previa" className="mt-2 rounded-lg border border-line max-h-56" />
        )}
      </div>
      <div>
        <label className="label">Texto de apoyo (Markdown: ## títulos, **negrita**, listas)</label>
        <textarea className="textarea" rows={8} value={f.contenidoMd} onChange={(e) => setF({ ...f, contenidoMd: e.target.value })} />
      </div>
      <div>
        <label className="label">Fuente</label>
        <input className="input" value={f.fuente} onChange={(e) => setF({ ...f, fuente: e.target.value })} />
      </div>

      {error && <p className="text-sm text-nivel-grave font-medium">{error}</p>}
      <button className="btn btn-primary btn-block" onClick={guardar} disabled={cargando}>
        {cargando ? "Creando…" : "Crear protocolo"}
      </button>
    </div>
  );
}

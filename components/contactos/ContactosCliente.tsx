"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ContactoEfectivo } from "@/lib/data/contactos";
import { CAT_CONTACTO } from "@/lib/labels";
import { BotonFavorito } from "@/components/BotonFavorito";

const CATS = Object.keys(CAT_CONTACTO);

export function ContactosCliente({ contactos }: { contactos: ContactoEfectivo[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [form, setForm] = useState<null | {
    id?: string;
    nombre: string;
    telefono: string;
    categoria: string;
    notas: string;
  }>(null);
  const [editandoBase, setEditandoBase] = useState<string | null>(null);
  const [telBase, setTelBase] = useState("");

  const grupos = useMemo(() => {
    const term = q.trim().toLowerCase();
    const filtrados = contactos.filter(
      (c) =>
        !term ||
        c.nombre.toLowerCase().includes(term) ||
        c.telefono.includes(term) ||
        (c.descripcion ?? "").toLowerCase().includes(term),
    );
    const map = new Map<string, ContactoEfectivo[]>();
    for (const c of filtrados) {
      if (!map.has(c.categoria)) map.set(c.categoria, []);
      map.get(c.categoria)!.push(c);
    }
    return map;
  }, [contactos, q]);

  async function guardarForm() {
    if (!form) return;
    const metodo = form.id ? "PUT" : "POST";
    const url = form.id ? `/api/contactos/${form.id}` : "/api/contactos";
    const res = await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm(null);
      router.refresh();
    }
  }

  async function borrar(id: string) {
    await fetch(`/api/contactos/${id}`, { method: "DELETE" });
    router.refresh();
  }

  async function ocultarBase(contactoBaseId: string, oculto: boolean) {
    await fetch("/api/contactos/ajuste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactoBaseId, oculto }),
    });
    router.refresh();
  }

  async function guardarTelBase(contactoBaseId: string) {
    await fetch("/api/contactos/ajuste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactoBaseId, telefonoCustom: telBase }),
    });
    setEditandoBase(null);
    setTelBase("");
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <input
        className="input"
        placeholder="Buscar contacto…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <button
        className="btn btn-primary btn-block"
        onClick={() =>
          setForm({ nombre: "", telefono: "", categoria: "COLEGAS", notas: "" })
        }
      >
        + Agregar contacto
      </button>

      {form && (
        <div className="card p-4 space-y-2">
          <input className="input" placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
          <input className="input" placeholder="Teléfono" inputMode="tel" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
          <select className="select" value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
            {CATS.map((c) => (
              <option key={c} value={c}>{CAT_CONTACTO[c]}</option>
            ))}
          </select>
          <input className="input" placeholder="Notas (opcional)" value={form.notas} onChange={(e) => setForm({ ...form, notas: e.target.value })} />
          <div className="flex gap-2">
            <button className="btn btn-primary flex-1" onClick={guardarForm}>Guardar</button>
            <button className="btn btn-ghost" onClick={() => setForm(null)}>Cancelar</button>
          </div>
        </div>
      )}

      {Array.from(grupos.entries()).map(([cat, items]) => (
        <div key={cat}>
          <h2 className="text-xs font-bold text-slatey uppercase tracking-wide mb-2">
            {CAT_CONTACTO[cat] ?? cat}
          </h2>
          <div className="space-y-2">
            {items.map((c) => (
              <div key={c.key} className="card-flat p-3">
                <div className="flex items-start gap-2">
                  <BotonFavorito tipo="CONTACTO" ref={c.key} inicial={c.favorito} className="mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-ink text-sm">{c.nombre}</p>
                    {c.descripcion && (
                      <p className="text-xs text-slatey">{c.descripcion}</p>
                    )}
                    {editandoBase === c.id ? (
                      <div className="flex gap-2 mt-1.5">
                        <input className="input !py-1.5" inputMode="tel" placeholder="Teléfono de tu servicio" value={telBase} onChange={(e) => setTelBase(e.target.value)} />
                        <button className="btn btn-primary !py-1.5 !px-3 text-sm" onClick={() => guardarTelBase(c.id)}>OK</button>
                      </div>
                    ) : c.telefono ? (
                      <a href={`tel:${c.telefono}`} className="inline-flex items-center gap-1 text-teal font-semibold text-sm mt-1">
                        {c.telefono}
                      </a>
                    ) : (
                      <p className="text-xs text-slatey mt-1 italic">Sin teléfono cargado</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-3 mt-2 text-xs">
                  {c.editable ? (
                    <>
                      <button className="text-navy font-semibold" onClick={() => setForm({ id: c.id, nombre: c.nombre, telefono: c.telefono, categoria: c.categoria, notas: c.descripcion ?? "" })}>
                        Editar
                      </button>
                      <button className="text-nivel-grave font-semibold" onClick={() => borrar(c.id)}>
                        Eliminar
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="text-navy font-semibold" onClick={() => { setEditandoBase(c.id); setTelBase(c.telefono); }}>
                        Poner mi número
                      </button>
                      <button className="text-slatey font-semibold" onClick={() => ocultarBase(c.id, true)}>
                        Ocultar
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  usuario: {
    nombre: string;
    email: string;
    especialidad: string | null;
    institucion: string | null;
    region: string | null;
    emailVerificado: boolean;
  };
}

export function PerfilCliente({ usuario }: Props) {
  const router = useRouter();
  const [f, setF] = useState({
    nombre: usuario.nombre,
    especialidad: usuario.especialidad ?? "",
    institucion: usuario.institucion ?? "",
    region: usuario.region ?? "",
  });
  const [msg, setMsg] = useState<string | null>(null);
  const [pw, setPw] = useState({ actual: "", nueva: "" });
  const [pwMsg, setPwMsg] = useState<string | null>(null);
  const [verifMsg, setVerifMsg] = useState<string | null>(null);

  async function guardarPerfil() {
    setMsg(null);
    const res = await fetch("/api/perfil", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });
    setMsg(res.ok ? "Guardado ✓" : "No se pudo guardar.");
    router.refresh();
  }

  async function cambiarPassword() {
    setPwMsg(null);
    const res = await fetch("/api/perfil/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pw),
    });
    const data = await res.json().catch(() => ({}));
    setPwMsg(res.ok ? "Contraseña actualizada ✓" : data.error || "Error.");
    if (res.ok) setPw({ actual: "", nueva: "" });
  }

  async function reenviarVerif() {
    setVerifMsg(null);
    const res = await fetch("/api/verificacion/reenviar", { method: "POST" });
    const data = await res.json().catch(() => ({}));
    setVerifMsg(
      data.enviado
        ? "Te enviamos un correo de verificación."
        : "Registrada la solicitud. Si no llega el correo, avisá al administrador.",
    );
  }

  async function salir() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="card p-4 space-y-3">
        <h2 className="font-bold text-navy">Datos profesionales</h2>
        <div>
          <label className="label">Nombre</label>
          <input className="input" value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Especialidad</label>
            <input className="input" value={f.especialidad} onChange={(e) => setF({ ...f, especialidad: e.target.value })} />
          </div>
          <div>
            <label className="label">Región</label>
            <input className="input" value={f.region} onChange={(e) => setF({ ...f, region: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="label">Institución</label>
          <input className="input" value={f.institucion} onChange={(e) => setF({ ...f, institucion: e.target.value })} />
        </div>
        <button className="btn btn-primary" onClick={guardarPerfil}>Guardar</button>
        {msg && <p className="text-sm text-slatey">{msg}</p>}
      </div>

      <div className="card p-4 space-y-2">
        <h2 className="font-bold text-navy">Correo</h2>
        <p className="text-sm text-slatey">{usuario.email}</p>
        {usuario.emailVerificado ? (
          <p className="text-sm text-nivel-leve font-semibold">Verificado ✓</p>
        ) : (
          <>
            <p className="text-sm text-nivel-mod font-semibold">Sin verificar</p>
            <button className="btn btn-ghost" onClick={reenviarVerif}>
              Reenviar verificación
            </button>
            {verifMsg && <p className="text-sm text-slatey">{verifMsg}</p>}
          </>
        )}
      </div>

      <div className="card p-4 space-y-3">
        <h2 className="font-bold text-navy">Cambiar contraseña</h2>
        <input className="input" type="password" placeholder="Contraseña actual" value={pw.actual} onChange={(e) => setPw({ ...pw, actual: e.target.value })} />
        <input className="input" type="password" placeholder="Nueva contraseña (mín. 8)" value={pw.nueva} onChange={(e) => setPw({ ...pw, nueva: e.target.value })} />
        <button className="btn btn-primary" onClick={cambiarPassword}>Actualizar</button>
        {pwMsg && <p className="text-sm text-slatey">{pwMsg}</p>}
      </div>

      <button className="btn btn-ghost btn-block" onClick={salir}>
        Cerrar sesión
      </button>
    </div>
  );
}

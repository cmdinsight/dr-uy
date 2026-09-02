"use client";

import { useState } from "react";

export function VisorImagen({ src, alt }: { src: string; alt: string }) {
  const [abierto, setAbierto] = useState(false);
  const [zoom, setZoom] = useState(1);

  return (
    <>
      <button
        onClick={() => {
          setAbierto(true);
          setZoom(1);
        }}
        className="card-flat p-2 w-full block"
        aria-label="Ampliar diagrama"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full rounded-lg" />
        <span className="text-xs text-slatey mt-1 block">Tocar para ampliar</span>
      </button>

      {abierto && (
        <div
          className="fixed inset-0 z-50 bg-ink/90 flex flex-col"
          onClick={() => setAbierto(false)}
        >
          <div className="flex justify-between items-center p-3 text-white text-sm">
            <span>{alt}</span>
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <button className="px-3 py-1 bg-white/15 rounded" onClick={() => setZoom((z) => Math.max(1, z - 0.5))}>−</button>
              <button className="px-3 py-1 bg-white/15 rounded" onClick={() => setZoom((z) => Math.min(4, z + 0.5))}>+</button>
              <button className="px-3 py-1 bg-white/15 rounded" onClick={() => setAbierto(false)}>Cerrar</button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-3" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="mx-auto bg-white rounded-lg"
              style={{ width: `${zoom * 100}%`, maxWidth: "none" }}
            />
          </div>
        </div>
      )}
    </>
  );
}

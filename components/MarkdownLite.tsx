// Render mínimo de Markdown sin dependencias. Soporta: ## / ### encabezados,
// **negrita**, `código`, listas con "- " y "1. ", y párrafos. Escapa HTML.

import React from "react";

function inline(text: string, keyPrefix: string): React.ReactNode[] {
  // Divide por **negrita** y `código`, respetando el orden.
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return tokens.map((tok, i) => {
    if (tok.startsWith("**") && tok.endsWith("**")) {
      return <strong key={`${keyPrefix}-${i}`}>{tok.slice(2, -2)}</strong>;
    }
    if (tok.startsWith("`") && tok.endsWith("`")) {
      return <code key={`${keyPrefix}-${i}`}>{tok.slice(1, -1)}</code>;
    }
    return <React.Fragment key={`${keyPrefix}-${i}`}>{tok}</React.Fragment>;
  });
}

export function MarkdownLite({ children }: { children: string }) {
  const lineas = children.replace(/\r\n/g, "\n").split("\n");
  const bloques: React.ReactNode[] = [];
  let lista: { tipo: "ul" | "ol"; items: string[] } | null = null;
  let parrafo: string[] = [];
  let k = 0;

  const cerrarParrafo = () => {
    if (parrafo.length) {
      bloques.push(<p key={`p-${k++}`}>{inline(parrafo.join(" "), `p-${k}`)}</p>);
      parrafo = [];
    }
  };
  const cerrarLista = () => {
    if (lista) {
      const Tag = lista.tipo;
      const items = lista.items;
      bloques.push(
        <Tag key={`l-${k++}`}>
          {items.map((it, i) => (
            <li key={i}>{inline(it, `li-${k}-${i}`)}</li>
          ))}
        </Tag>,
      );
      lista = null;
    }
  };

  for (const raw of lineas) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      cerrarParrafo();
      cerrarLista();
      continue;
    }
    if (line.startsWith("### ")) {
      cerrarParrafo();
      cerrarLista();
      bloques.push(<h3 key={`h-${k++}`}>{inline(line.slice(4), `h-${k}`)}</h3>);
      continue;
    }
    if (line.startsWith("## ")) {
      cerrarParrafo();
      cerrarLista();
      bloques.push(<h2 key={`h-${k++}`}>{inline(line.slice(3), `h-${k}`)}</h2>);
      continue;
    }
    const ol = line.match(/^(\d+)\.\s+(.*)$/);
    const ul = line.match(/^[-*]\s+(.*)$/);
    if (ol) {
      cerrarParrafo();
      if (!lista || lista.tipo !== "ol") {
        cerrarLista();
        lista = { tipo: "ol", items: [] };
      }
      lista.items.push(ol[2]);
      continue;
    }
    if (ul) {
      cerrarParrafo();
      if (!lista || lista.tipo !== "ul") {
        cerrarLista();
        lista = { tipo: "ul", items: [] };
      }
      lista.items.push(ul[1]);
      continue;
    }
    cerrarLista();
    parrafo.push(line);
  }
  cerrarParrafo();
  cerrarLista();

  return <div className="prose-lite">{bloques}</div>;
}

// Generador de diagramas de flujo simples en SVG. Vertical, una columna, con
// nodos de tipo acción / decisión / alerta / inicio. Suficiente para consulta
// rápida; los algoritmos con ramas complejas se explican en el texto.

export type NodoTipo = "inicio" | "accion" | "decision" | "alerta" | "fin";

export interface Nodo {
  tipo: NodoTipo;
  texto: string;
}

const COLOR: Record<NodoTipo, { fill: string; stroke: string; text: string }> = {
  inicio: { fill: "#14324f", stroke: "#0d2338", text: "#ffffff" },
  accion: { fill: "#ffffff", stroke: "#c9d6e3", text: "#0f1b2d" },
  decision: { fill: "#e8effc", stroke: "#9db8e8", text: "#12203a" },
  alerta: { fill: "#fbe6e6", stroke: "#e3a3a3", text: "#7f1d1d" },
  fin: { fill: "#e8f6ec", stroke: "#9bd0ab", text: "#14532d" },
};

function wrap(texto: string, max = 46): string[] {
  const palabras = texto.split(/\s+/);
  const lineas: string[] = [];
  let actual = "";
  for (const p of palabras) {
    if ((actual + " " + p).trim().length > max) {
      if (actual) lineas.push(actual.trim());
      actual = p;
    } else {
      actual = (actual + " " + p).trim();
    }
  }
  if (actual) lineas.push(actual.trim());
  return lineas;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function diagramaFlujo(titulo: string, nodos: Nodo[]): string {
  const W = 620;
  const padX = 24;
  const boxW = W - padX * 2;
  const lineH = 18;
  const boxPadY = 14;
  const gap = 26;

  let y = 64;
  const partes: string[] = [];

  nodos.forEach((n, i) => {
    const lineas = wrap(n.texto);
    const boxH = lineas.length * lineH + boxPadY * 2;
    const c = COLOR[n.tipo];
    const rx = n.tipo === "inicio" || n.tipo === "fin" ? 20 : 10;

    partes.push(
      `<rect x="${padX}" y="${y}" width="${boxW}" height="${boxH}" rx="${rx}" fill="${c.fill}" stroke="${c.stroke}" stroke-width="1.5"/>`,
    );
    lineas.forEach((ln, li) => {
      const ty = y + boxPadY + lineH * li + 13;
      const weight = n.tipo === "inicio" || n.tipo === "decision" ? "600" : "400";
      partes.push(
        `<text x="${W / 2}" y="${ty}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="${weight}" fill="${c.text}">${esc(ln)}</text>`,
      );
    });

    y += boxH;
    if (i < nodos.length - 1) {
      partes.push(
        `<line x1="${W / 2}" y1="${y}" x2="${W / 2}" y2="${y + gap}" stroke="#8798ab" stroke-width="1.5"/>`,
        `<polygon points="${W / 2 - 5},${y + gap - 6} ${W / 2 + 5},${y + gap - 6} ${W / 2},${y + gap}" fill="#8798ab"/>`,
      );
      y += gap;
    }
  });

  const H = y + 28;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(titulo)}">
<rect width="${W}" height="${H}" fill="#ffffff"/>
<text x="${W / 2}" y="34" text-anchor="middle" font-family="Sora, Inter, system-ui, sans-serif" font-size="17" font-weight="700" fill="#0f1b2d">${esc(titulo)}</text>
${partes.join("\n")}
</svg>`;
}

import type { TestDef } from "../tipos";

// ─────────────────────────── Escala de Glasgow (GCS) ───────────────────────────
export const GLASGOW: TestDef = {
  slug: "glasgow",
  nombre: "Escala de coma de Glasgow (GCS)",
  categoria: "NEUROLOGIA",
  resumen:
    "Cuantifica el nivel de conciencia a partir de la mejor respuesta ocular, verbal y motora. Rango 3–15.",
  referencia:
    "Teasdale G, Jennett B. Lancet 1974. Actualización Glasgow Coma Scale (glasgowcomascale.org).",
  poblacion: "Adultos y niños mayores (para <5 años usar la escala pediátrica).",
  modoCalculo: "SUMA",
  items: [
    {
      clave: "ocular",
      enunciado: "Apertura ocular",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Espontánea", valor: 4 },
        { etiqueta: "Al hablarle / a la orden", valor: 3 },
        { etiqueta: "Al dolor (presión)", valor: 2 },
        { etiqueta: "Ninguna", valor: 1 },
      ],
    },
    {
      clave: "verbal",
      enunciado: "Respuesta verbal",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Orientada", valor: 5 },
        { etiqueta: "Confusa", valor: 4 },
        { etiqueta: "Palabras inapropiadas", valor: 3 },
        { etiqueta: "Sonidos incomprensibles", valor: 2 },
        { etiqueta: "Ninguna", valor: 1 },
      ],
    },
    {
      clave: "motora",
      enunciado: "Respuesta motora",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Obedece órdenes", valor: 6 },
        { etiqueta: "Localiza el estímulo doloroso", valor: 5 },
        { etiqueta: "Retirada / flexión normal al dolor", valor: 4 },
        { etiqueta: "Flexión anormal (decorticación)", valor: 3 },
        { etiqueta: "Extensión (descerebración)", valor: 2 },
        { etiqueta: "Ninguna", valor: 1 },
      ],
    },
  ],
  rangos: [
    {
      min: 3,
      max: 8,
      nivel: "GRAVE",
      titulo: "TCE grave / coma (GCS ≤ 8)",
      detalle:
        "Incapacidad de proteger la vía aérea: valorar intubación orotraqueal. Traslado a centro con TC y neurocirugía. Reevaluar de forma seriada y registrar la hora.",
    },
    {
      min: 9,
      max: 12,
      nivel: "MODERADO",
      titulo: "Compromiso moderado de la conciencia",
      detalle:
        "Vigilancia estrecha, TC de cráneo, reevaluación seriada (el deterioro de 2 puntos o más es una alarma).",
    },
    {
      min: 13,
      max: 15,
      nivel: "LEVE",
      titulo: "Compromiso leve o ausente",
      detalle:
        "GCS 15 = normal. Con antecedente de trauma, aplicar reglas de indicación de TC (p. ej. Canadian CT Head Rule).",
    },
  ],
};

// ─────────────────────────── qSOFA ───────────────────────────
export const QSOFA: TestDef = {
  slug: "qsofa",
  nombre: "qSOFA (quick SOFA)",
  categoria: "EMERGENCIA",
  resumen:
    "Identifica, fuera de UCI, a pacientes con infección y mayor riesgo de evolución desfavorable. 3 criterios.",
  referencia: "Singer M, et al. Sepsis-3. JAMA 2016;315(8):801–810.",
  poblacion: "Adultos con sospecha de infección, fuera de cuidados intensivos.",
  modoCalculo: "SUMA",
  items: [
    {
      clave: "fr",
      enunciado: "Frecuencia respiratoria ≥ 22 /min",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "No", valor: 0 },
        { etiqueta: "Sí", valor: 1 },
      ],
    },
    {
      clave: "mental",
      enunciado: "Alteración del estado mental (Glasgow < 15)",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "No", valor: 0 },
        { etiqueta: "Sí", valor: 1 },
      ],
    },
    {
      clave: "pas",
      enunciado: "Presión arterial sistólica ≤ 100 mmHg",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "No", valor: 0 },
        { etiqueta: "Sí", valor: 1 },
      ],
    },
  ],
  rangos: [
    {
      min: 0,
      max: 1,
      nivel: "LEVE",
      titulo: "qSOFA < 2",
      detalle:
        "Menor riesgo, pero no descarta sepsis. Si la sospecha clínica es alta, seguir evaluando (lactato, SOFA, foco) y reevaluar.",
    },
    {
      min: 2,
      max: 3,
      nivel: "GRAVE",
      titulo: "qSOFA ≥ 2 — alto riesgo",
      detalle:
        "Mayor mortalidad y estadía prolongada. Buscar disfunción orgánica, medir lactato, hemocultivos, antibiótico precoz y reanimación con fluidos según necesidad.",
    },
  ],
};

// ─────────────────────────── NEWS2 ───────────────────────────
export const NEWS2: TestDef = {
  slug: "news2",
  nombre: "NEWS2 (National Early Warning Score 2)",
  categoria: "EMERGENCIA",
  resumen:
    "Puntaje de alerta temprana por deterioro fisiológico. Suma 7 parámetros. (Escala de SpO2 1; para EPOC hipercápnico usar la escala 2.)",
  referencia:
    "Royal College of Physicians. National Early Warning Score (NEWS) 2. Londres, 2017.",
  poblacion: "Adultos ≥ 16 años, no embarazadas.",
  modoCalculo: "SUMA",
  items: [
    {
      clave: "fr",
      enunciado: "Frecuencia respiratoria (/min)",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "≤ 8", valor: 3 },
        { etiqueta: "9–11", valor: 1 },
        { etiqueta: "12–20", valor: 0 },
        { etiqueta: "21–24", valor: 2 },
        { etiqueta: "≥ 25", valor: 3 },
      ],
    },
    {
      clave: "spo2",
      enunciado: "SpO₂ (%) — escala 1",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "≥ 96", valor: 0 },
        { etiqueta: "94–95", valor: 1 },
        { etiqueta: "92–93", valor: 2 },
        { etiqueta: "≤ 91", valor: 3 },
      ],
    },
    {
      clave: "o2",
      enunciado: "¿Recibe oxígeno suplementario?",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Aire ambiente", valor: 0 },
        { etiqueta: "Oxígeno", valor: 2 },
      ],
    },
    {
      clave: "pas",
      enunciado: "Presión arterial sistólica (mmHg)",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "≤ 90", valor: 3 },
        { etiqueta: "91–100", valor: 2 },
        { etiqueta: "101–110", valor: 1 },
        { etiqueta: "111–219", valor: 0 },
        { etiqueta: "≥ 220", valor: 3 },
      ],
    },
    {
      clave: "fc",
      enunciado: "Frecuencia cardíaca (/min)",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "≤ 40", valor: 3 },
        { etiqueta: "41–50", valor: 1 },
        { etiqueta: "51–90", valor: 0 },
        { etiqueta: "91–110", valor: 1 },
        { etiqueta: "111–130", valor: 2 },
        { etiqueta: "≥ 131", valor: 3 },
      ],
    },
    {
      clave: "conciencia",
      enunciado: "Nivel de conciencia",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Alerta", valor: 0 },
        {
          etiqueta: "Nueva confusión, o responde a voz / dolor / no responde",
          valor: 3,
        },
      ],
    },
    {
      clave: "temp",
      enunciado: "Temperatura (°C)",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "≤ 35.0", valor: 3 },
        { etiqueta: "35.1–36.0", valor: 1 },
        { etiqueta: "36.1–38.0", valor: 0 },
        { etiqueta: "38.1–39.0", valor: 1 },
        { etiqueta: "≥ 39.1", valor: 2 },
      ],
    },
  ],
  rangos: [
    {
      min: 0,
      max: 4,
      nivel: "LEVE",
      titulo: "Riesgo bajo",
      detalle:
        "Respuesta por enfermería; reevaluación cada 4–6 h. Ojo: un solo parámetro en 3 puntos ya obliga a valoración médica urgente aunque el total sea bajo.",
    },
    {
      min: 5,
      max: 6,
      nivel: "MODERADO",
      titulo: "Riesgo medio",
      detalle:
        "Valoración médica urgente, monitorización más frecuente (cada 1 h), considerar traslado a área de mayor cuidado.",
    },
    {
      min: 7,
      max: 20,
      nivel: "GRAVE",
      titulo: "Riesgo alto",
      detalle:
        "Respuesta de emergencia: equipo con competencias en cuidados críticos, monitorización continua, valorar UCI.",
    },
  ],
};

// ─────────────────── Cincinnati prehospitalaria (CPSS / FAST) ───────────────────
export const CINCINNATI: TestDef = {
  slug: "cincinnati",
  nombre: "Escala prehospitalaria de ACV de Cincinnati (CPSS)",
  categoria: "NEUROLOGIA",
  resumen:
    "Tamizaje rápido de ACV con 3 signos. Un solo signo alterado ya sugiere ACV con alta probabilidad.",
  referencia: "Kothari RU, et al. Ann Emerg Med 1999;33(4):373–378.",
  poblacion: "Sospecha de ACV en el ámbito prehospitalario o en urgencias.",
  modoCalculo: "REGLA_CUALQUIERA_POSITIVO",
  items: [
    {
      clave: "facial",
      enunciado: "Asimetría facial (pedir que sonría o muestre los dientes)",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Simétrica (normal)", valor: 0 },
        { etiqueta: "Un lado se mueve menos", valor: 1 },
      ],
    },
    {
      clave: "brazos",
      enunciado:
        "Descenso de un brazo (brazos extendidos 10 s con ojos cerrados)",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Los mantiene igual", valor: 0 },
        { etiqueta: "Un brazo cae o pronación", valor: 1 },
      ],
    },
    {
      clave: "lenguaje",
      enunciado: "Alteración del lenguaje (repetir una frase)",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Habla normal", valor: 0 },
        { etiqueta: "Palabras erróneas, arrastradas o no habla", valor: 1 },
      ],
    },
  ],
  rangos: [
    {
      min: 0,
      max: 0,
      nivel: "LEVE",
      titulo: "Ningún signo presente",
      detalle:
        "No descarta ACV (especialmente de circulación posterior). Si la sospecha clínica persiste, activar el código ictus igual.",
    },
    {
      min: 1,
      max: 3,
      nivel: "GRAVE",
      titulo: "Al menos un signo presente — probable ACV",
      detalle:
        "Activar código ictus. Registrar la hora exacta de inicio (o última vez visto bien), glucemia capilar, y trasladar a centro con TC y capacidad de trombólisis/trombectomía.",
    },
  ],
};

// ─────────────────────────── Escala del dolor (EVA / EN) ───────────────────────────
export const DOLOR_EVA: TestDef = {
  slug: "dolor-eva",
  nombre: "Escala numérica del dolor (0–10)",
  categoria: "DOLOR",
  resumen:
    "Intensidad del dolor referida por el paciente, de 0 (sin dolor) a 10 (el peor dolor imaginable).",
  referencia:
    "Escala numérica verbal / EVA. Uso estándar en valoración y manejo del dolor agudo.",
  modoCalculo: "SUMA",
  items: [
    {
      clave: "intensidad",
      enunciado: "Intensidad del dolor ahora",
      tipo: "NUMERICO",
      min: 0,
      max: 10,
      paso: 1,
    },
  ],
  rangos: [
    { min: 0, max: 0, nivel: "INFO", titulo: "Sin dolor", detalle: "" },
    {
      min: 1,
      max: 3,
      nivel: "LEVE",
      titulo: "Dolor leve",
      detalle: "Analgésicos no opioides (paracetamol, AINE si no hay contraindicación).",
    },
    {
      min: 4,
      max: 6,
      nivel: "MODERADO",
      titulo: "Dolor moderado",
      detalle:
        "Analgesia pautada y reevaluación a los 30–60 min. Considerar opioide débil.",
    },
    {
      min: 7,
      max: 10,
      nivel: "GRAVE",
      titulo: "Dolor intenso",
      detalle:
        "Analgesia rápida (opioide fuerte titulado IV si corresponde). Reevaluar a los 15–30 min y buscar la causa.",
    },
  ],
};

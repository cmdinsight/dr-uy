import type { TestDef } from "../tipos";

const SI_NO = (valSi: number) => [
  { etiqueta: "No", valor: 0 },
  { etiqueta: "Sí", valor: valSi },
];

// ─────────────────────────── CURB-65 ───────────────────────────
export const CURB65: TestDef = {
  slug: "curb-65",
  nombre: "CURB-65 (neumonía adquirida en la comunidad)",
  categoria: "RESPIRATORIO",
  resumen:
    "Estratifica la gravedad de la neumonía comunitaria y orienta el sitio de atención. 5 criterios de 1 punto.",
  referencia: "Lim WS, et al. Thorax 2003;58(5):377–382.",
  poblacion: "Adultos con neumonía adquirida en la comunidad.",
  modoCalculo: "SUMA",
  items: [
    {
      clave: "confusion",
      enunciado: "Confusión de nueva aparición",
      tipo: "UNICA",
      opciones: SI_NO(1),
    },
    {
      clave: "urea",
      enunciado: "Urea > 7 mmol/L (BUN > 19 mg/dL)",
      tipo: "UNICA",
      ayuda: "En el ámbito prehospitalario, si no hay laboratorio, considerar CRB-65 (omitir este ítem).",
      opciones: SI_NO(1),
    },
    {
      clave: "fr",
      enunciado: "Frecuencia respiratoria ≥ 30 /min",
      tipo: "UNICA",
      opciones: SI_NO(1),
    },
    {
      clave: "pa",
      enunciado: "PA sistólica < 90 mmHg o diastólica ≤ 60 mmHg",
      tipo: "UNICA",
      opciones: SI_NO(1),
    },
    {
      clave: "edad",
      enunciado: "Edad ≥ 65 años",
      tipo: "UNICA",
      opciones: SI_NO(1),
    },
  ],
  rangos: [
    {
      min: 0,
      max: 1,
      nivel: "LEVE",
      titulo: "Grupo 1 — mortalidad baja (~1,5 %)",
      detalle: "Habitualmente tratamiento ambulatorio.",
    },
    {
      min: 2,
      max: 2,
      nivel: "MODERADO",
      titulo: "Grupo 2 — mortalidad intermedia (~9 %)",
      detalle:
        "Considerar internación breve o supervisión ambulatoria estrecha.",
    },
    {
      min: 3,
      max: 5,
      nivel: "GRAVE",
      titulo: "Grupo 3 — mortalidad alta (15–40 %)",
      detalle: "Internación. Con 4–5 puntos, valorar cuidados intensivos.",
    },
  ],
};

// ─────────────────────────── Wells para TEP (simplificado) ───────────────────────────
export const WELLS_TEP: TestDef = {
  slug: "wells-tep",
  nombre: "Score de Wells para tromboembolismo pulmonar (simplificado)",
  categoria: "RESPIRATORIO",
  resumen:
    "Probabilidad clínica de TEP. Versión simplificada: 7 criterios de 1 punto. ≥ 2 = TEP probable.",
  referencia:
    "Wells PS, et al. Ann Intern Med 2001. Gibson NS, et al. (versión simplificada) J Thromb Haemost 2008.",
  poblacion: "Adultos con sospecha de TEP.",
  modoCalculo: "SUMA",
  items: [
    {
      clave: "tvp",
      enunciado: "Signos y síntomas clínicos de TVP",
      tipo: "UNICA",
      opciones: SI_NO(1),
    },
    {
      clave: "alternativa",
      enunciado: "TEP es el diagnóstico más probable (o igual de probable)",
      tipo: "UNICA",
      opciones: SI_NO(1),
    },
    {
      clave: "fc",
      enunciado: "Frecuencia cardíaca > 100 /min",
      tipo: "UNICA",
      opciones: SI_NO(1),
    },
    {
      clave: "inmovilizacion",
      enunciado: "Inmovilización ≥ 3 días o cirugía en las últimas 4 semanas",
      tipo: "UNICA",
      opciones: SI_NO(1),
    },
    {
      clave: "previo",
      enunciado: "TVP o TEP previos",
      tipo: "UNICA",
      opciones: SI_NO(1),
    },
    {
      clave: "hemoptisis",
      enunciado: "Hemoptisis",
      tipo: "UNICA",
      opciones: SI_NO(1),
    },
    {
      clave: "cancer",
      enunciado: "Cáncer activo (tratamiento en 6 meses o paliativo)",
      tipo: "UNICA",
      opciones: SI_NO(1),
    },
  ],
  rangos: [
    {
      min: 0,
      max: 1,
      nivel: "LEVE",
      titulo: "TEP improbable",
      detalle:
        "Aplicar regla PERC (si aplica) o dímero-D de alta sensibilidad. Si el dímero-D es negativo (o ajustado por edad), se descarta TEP sin imagen.",
    },
    {
      min: 2,
      max: 7,
      nivel: "GRAVE",
      titulo: "TEP probable",
      detalle:
        "AngioTC de tórax (o gammagrafía V/Q si contraindicada). No basta el dímero-D para descartar.",
    },
  ],
};

// ─────────────────────────── PERC ───────────────────────────
export const PERC: TestDef = {
  slug: "perc",
  nombre: "Regla PERC (descarte de TEP)",
  categoria: "RESPIRATORIO",
  resumen:
    "En pacientes de baja probabilidad clínica, si los 8 criterios están ausentes se descarta TEP sin dímero-D ni imagen.",
  referencia: "Kline JA, et al. J Thromb Haemost 2004;2(8):1247–1255.",
  poblacion:
    "Adultos con baja probabilidad clínica de TEP (p. ej. Wells simplificado 0–1 y gestalt < 15 %).",
  modoCalculo: "REGLA_CUALQUIERA_POSITIVO",
  items: [
    { clave: "edad", enunciado: "Edad ≥ 50 años", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "fc", enunciado: "Frecuencia cardíaca ≥ 100 /min", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "spo2", enunciado: "SpO₂ < 95 % (aire ambiente)", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "edema", enunciado: "Edema unilateral de miembro inferior", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "hemoptisis", enunciado: "Hemoptisis", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "cirugia", enunciado: "Cirugía o traumatismo con hospitalización en las últimas 4 semanas", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "previo", enunciado: "Antecedente de TVP o TEP", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "estrogenos", enunciado: "Uso de estrógenos (anticoncepción / terapia hormonal)", tipo: "UNICA", opciones: SI_NO(1) },
  ],
  rangos: [
    {
      min: 0,
      max: 0,
      nivel: "LEVE",
      titulo: "PERC negativo",
      detalle:
        "En un paciente de baja probabilidad, ningún criterio presente → el riesgo de TEP es < 2 %. No se requiere dímero-D ni imagen.",
    },
    {
      min: 1,
      max: 8,
      nivel: "MODERADO",
      titulo: "PERC positivo",
      detalle:
        "No permite descartar TEP. Continuar con dímero-D o imagen según la probabilidad clínica.",
    },
  ],
};

// ─────────────────────────── Centor / McIsaac ───────────────────────────
export const CENTOR: TestDef = {
  slug: "centor-mcisaac",
  nombre: "Criterios de Centor modificados (McIsaac)",
  categoria: "INFECCIOSO",
  resumen:
    "Probabilidad de faringitis por estreptococo betahemolítico del grupo A y necesidad de test/antibiótico.",
  referencia:
    "Centor RM, et al. Med Decis Making 1981. McIsaac WJ, et al. CMAJ 1998;158(1):75–83.",
  poblacion: "Pacientes con odinofagia aguda.",
  modoCalculo: "SUMA",
  items: [
    { clave: "fiebre", enunciado: "Fiebre > 38 °C (por historia o registro)", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "tos", enunciado: "Ausencia de tos", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "adenopatias", enunciado: "Adenopatías cervicales anteriores dolorosas", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "exudado", enunciado: "Exudado o inflamación amigdalina", tipo: "UNICA", opciones: SI_NO(1) },
    {
      clave: "edad",
      enunciado: "Edad",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "3–14 años", valor: 1 },
        { etiqueta: "15–44 años", valor: 0 },
        { etiqueta: "≥ 45 años", valor: -1 },
      ],
    },
  ],
  rangos: [
    {
      min: -1,
      max: 1,
      nivel: "LEVE",
      titulo: "Riesgo bajo (0–1)",
      detalle: "No se recomienda test rápido ni antibiótico. Tratamiento sintomático.",
    },
    {
      min: 2,
      max: 3,
      nivel: "MODERADO",
      titulo: "Riesgo intermedio (2–3)",
      detalle:
        "Test rápido de antígeno o cultivo; antibiótico solo si es positivo.",
    },
    {
      min: 4,
      max: 5,
      nivel: "GRAVE",
      titulo: "Riesgo alto (4–5)",
      detalle:
        "Test rápido y/o antibiótico empírico según el contexto y las guías locales.",
    },
  ],
};

// ─────────────────────────── Alvarado (apendicitis) ───────────────────────────
export const ALVARADO: TestDef = {
  slug: "alvarado",
  nombre: "Escala de Alvarado (apendicitis aguda)",
  categoria: "OTROS",
  resumen:
    "Probabilidad de apendicitis aguda a partir de síntomas, signos y laboratorio. Rango 0–10.",
  referencia: "Alvarado A. Ann Emerg Med 1986;15(5):557–564.",
  poblacion: "Pacientes con dolor abdominal y sospecha de apendicitis.",
  modoCalculo: "SUMA",
  items: [
    { clave: "migratorio", enunciado: "Dolor migratorio a fosa ilíaca derecha", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "anorexia", enunciado: "Anorexia", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "nauseas", enunciado: "Náuseas o vómitos", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "dolor_fid", enunciado: "Dolor a la palpación en fosa ilíaca derecha", tipo: "UNICA", opciones: SI_NO(2) },
    { clave: "rebote", enunciado: "Dolor de rebote (Blumberg)", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "fiebre", enunciado: "Temperatura ≥ 37,3 °C", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "leucocitosis", enunciado: "Leucocitosis > 10.000 /mm³", tipo: "UNICA", opciones: SI_NO(2) },
    { clave: "neutrofilia", enunciado: "Neutrofilia > 75 % (desviación a la izquierda)", tipo: "UNICA", opciones: SI_NO(1) },
  ],
  rangos: [
    {
      min: 0,
      max: 4,
      nivel: "LEVE",
      titulo: "Baja probabilidad",
      detalle: "Apendicitis poco probable. Observación o alta con pautas de alarma.",
    },
    {
      min: 5,
      max: 6,
      nivel: "MODERADO",
      titulo: "Probabilidad intermedia",
      detalle: "Observación y estudio por imagen (ecografía o TC). Valoración quirúrgica.",
    },
    {
      min: 7,
      max: 10,
      nivel: "GRAVE",
      titulo: "Alta probabilidad",
      detalle: "Valoración quirúrgica; alta sospecha de apendicitis aguda.",
    },
  ],
};

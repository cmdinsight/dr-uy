import type { TestDef } from "../tipos";

const SI_NO = (valSi: number) => [
  { etiqueta: "No", valor: 0 },
  { etiqueta: "Sí", valor: valSi },
];

// ─────────────────────────── Wells para TVP ───────────────────────────
export const WELLS_TVP: TestDef = {
  slug: "wells-tvp",
  nombre: "Score de Wells para trombosis venosa profunda",
  categoria: "CARDIOVASCULAR",
  resumen:
    "Probabilidad clínica de TVP de miembros inferiores. Orienta el uso de dímero-D vs eco-Doppler.",
  referencia: "Wells PS, et al. Lancet 1997; N Engl J Med 2003;349:1227–1235.",
  poblacion: "Adultos con sospecha de TVP de miembro inferior.",
  modoCalculo: "SUMA",
  items: [
    { clave: "cancer", enunciado: "Cáncer activo (tratamiento actual o en los últimos 6 meses, o paliativo)", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "paralisis", enunciado: "Parálisis, paresia o inmovilización reciente con yeso de un miembro inferior", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "encamamiento", enunciado: "Encamamiento > 3 días o cirugía mayor en las últimas 12 semanas", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "dolor_trayecto", enunciado: "Dolor a la palpación en el trayecto del sistema venoso profundo", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "edema_pierna", enunciado: "Edema de toda la pierna", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "edema_pantorrilla", enunciado: "Aumento del perímetro de la pantorrilla > 3 cm respecto a la contralateral", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "fovea", enunciado: "Edema con fóvea limitado a la pierna sintomática", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "colaterales", enunciado: "Circulación venosa colateral superficial (no varicosa)", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "tvp_previa", enunciado: "TVP previa documentada", tipo: "UNICA", opciones: SI_NO(1) },
    {
      clave: "alternativa",
      enunciado: "Diagnóstico alternativo al menos tan probable como la TVP",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "No", valor: 0 },
        { etiqueta: "Sí", valor: -2 },
      ],
    },
  ],
  rangos: [
    {
      min: -2,
      max: 0,
      nivel: "LEVE",
      titulo: "Probabilidad baja",
      detalle:
        "Dímero-D de alta sensibilidad: si es negativo, se descarta TVP. Si es positivo, eco-Doppler.",
    },
    {
      min: 1,
      max: 2,
      nivel: "MODERADO",
      titulo: "Probabilidad intermedia",
      detalle: "Dímero-D de alta sensibilidad o eco-Doppler de entrada.",
    },
    {
      min: 3,
      max: 9,
      nivel: "GRAVE",
      titulo: "Probabilidad alta",
      detalle:
        "Eco-Doppler venoso. No descartar solo con dímero-D. Si no hay acceso inmediato a eco, valorar anticoagulación empírica.",
    },
  ],
};

// ─────────────────────────── HEART score ───────────────────────────
export const HEART: TestDef = {
  slug: "heart",
  nombre: "HEART score (dolor torácico en urgencias)",
  categoria: "CARDIOVASCULAR",
  resumen:
    "Riesgo de evento cardíaco mayor (MACE) a 6 semanas en pacientes con dolor torácico. Rango 0–10.",
  referencia: "Six AJ, Backus BE, Kelder JC. Neth Heart J 2008;16(6):191–196.",
  poblacion: "Adultos con dolor torácico sin elevación del ST evidente ni inestabilidad.",
  modoCalculo: "SUMA",
  items: [
    {
      clave: "historia",
      enunciado: "Historia clínica (anamnesis del dolor)",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Poco sospechosa", valor: 0 },
        { etiqueta: "Moderadamente sospechosa", valor: 1 },
        { etiqueta: "Muy sospechosa", valor: 2 },
      ],
    },
    {
      clave: "ecg",
      enunciado: "ECG",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Normal", valor: 0 },
        { etiqueta: "Alteración inespecífica de la repolarización / BRI / marcapasos", valor: 1 },
        { etiqueta: "Descenso significativo del ST", valor: 2 },
      ],
    },
    {
      clave: "edad",
      enunciado: "Edad",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "< 45 años", valor: 0 },
        { etiqueta: "45–64 años", valor: 1 },
        { etiqueta: "≥ 65 años", valor: 2 },
      ],
    },
    {
      clave: "factores",
      enunciado: "Factores de riesgo (HTA, dislipemia, diabetes, tabaquismo, obesidad, antecedentes familiares)",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Ninguno", valor: 0 },
        { etiqueta: "1–2 factores", valor: 1 },
        { etiqueta: "≥ 3 factores o enfermedad ateroesclerótica conocida", valor: 2 },
      ],
    },
    {
      clave: "troponina",
      enunciado: "Troponina",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "≤ límite normal", valor: 0 },
        { etiqueta: "1–3 × límite normal", valor: 1 },
        { etiqueta: "> 3 × límite normal", valor: 2 },
      ],
    },
  ],
  rangos: [
    {
      min: 0,
      max: 3,
      nivel: "LEVE",
      titulo: "Riesgo bajo (MACE ~1–2 %)",
      detalle:
        "Con troponina seriada negativa, posible alta con seguimiento ambulatorio precoz.",
    },
    {
      min: 4,
      max: 6,
      nivel: "MODERADO",
      titulo: "Riesgo intermedio (MACE ~12–17 %)",
      detalle: "Observación, troponina seriada y valoración cardiológica / pruebas de isquemia.",
    },
    {
      min: 7,
      max: 10,
      nivel: "GRAVE",
      titulo: "Riesgo alto (MACE ~50 %)",
      detalle: "Ingreso y estrategia invasiva precoz.",
    },
  ],
};

// ─────────────────────────── CHA₂DS₂-VASc ───────────────────────────
export const CHADSVASC: TestDef = {
  slug: "cha2ds2-vasc",
  nombre: "CHA₂DS₂-VASc (riesgo embólico en fibrilación auricular)",
  categoria: "CARDIOVASCULAR",
  resumen:
    "Riesgo anual de ACV / embolia sistémica en fibrilación auricular no valvular. Orienta la anticoagulación.",
  referencia: "Lip GYH, et al. Chest 2010;137(2):263–272. Guías ESC de FA.",
  poblacion: "Adultos con fibrilación auricular no valvular.",
  modoCalculo: "SUMA",
  items: [
    { clave: "icc", enunciado: "Insuficiencia cardíaca o disfunción ventricular izquierda", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "hta", enunciado: "Hipertensión arterial", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "diabetes", enunciado: "Diabetes mellitus", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "acv", enunciado: "ACV, AIT o tromboembolia previos", tipo: "UNICA", opciones: SI_NO(2) },
    { clave: "vascular", enunciado: "Enfermedad vascular (IAM previo, enfermedad arterial periférica, placa aórtica)", tipo: "UNICA", opciones: SI_NO(1) },
    {
      clave: "edad",
      enunciado: "Edad",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "< 65 años", valor: 0 },
        { etiqueta: "65–74 años", valor: 1 },
        { etiqueta: "≥ 75 años", valor: 2 },
      ],
    },
    {
      clave: "sexo",
      enunciado: "Sexo",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Masculino", valor: 0 },
        { etiqueta: "Femenino", valor: 1 },
      ],
    },
  ],
  rangos: [
    {
      min: 0,
      max: 0,
      nivel: "LEVE",
      titulo: "Riesgo bajo",
      detalle: "Varón con 0 puntos (o mujer con 1 punto solo por el sexo): no se recomienda anticoagulación.",
    },
    {
      min: 1,
      max: 1,
      nivel: "MODERADO",
      titulo: "Riesgo intermedio",
      detalle: "Varón con 1 punto: considerar anticoagulación oral valorando el riesgo de sangrado y la preferencia del paciente.",
    },
    {
      min: 2,
      max: 9,
      nivel: "GRAVE",
      titulo: "Riesgo alto",
      detalle: "Anticoagulación oral recomendada (preferentemente ACOD), salvo contraindicación.",
    },
  ],
};

// ─────────────────────────── HAS-BLED ───────────────────────────
export const HASBLED: TestDef = {
  slug: "has-bled",
  nombre: "HAS-BLED (riesgo de sangrado en anticoagulación por FA)",
  categoria: "CARDIOVASCULAR",
  resumen:
    "Riesgo de hemorragia mayor en pacientes anticoagulados por fibrilación auricular. No contraindica anticoagular: identifica factores a corregir.",
  referencia: "Pisters R, et al. Chest 2010;138(5):1093–1100.",
  poblacion: "Adultos con FA candidatos a anticoagulación.",
  modoCalculo: "SUMA",
  items: [
    { clave: "hta", enunciado: "Hipertensión no controlada (PAS > 160 mmHg)", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "renal", enunciado: "Función renal alterada (diálisis, trasplante o creatinina > 2,26 mg/dL)", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "hepatica", enunciado: "Función hepática alterada (cirrosis, o bilirrubina > 2× con transaminasas > 3×)", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "acv", enunciado: "ACV previo", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "sangrado", enunciado: "Sangrado mayor previo o predisposición al sangrado", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "inr", enunciado: "INR lábil (si toma warfarina; tiempo en rango < 60 %)", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "edad", enunciado: "Edad > 65 años", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "farmacos", enunciado: "Fármacos que predisponen al sangrado (AINE, antiagregantes)", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "alcohol", enunciado: "Consumo de alcohol ≥ 8 unidades por semana", tipo: "UNICA", opciones: SI_NO(1) },
  ],
  rangos: [
    {
      min: 0,
      max: 2,
      nivel: "LEVE",
      titulo: "Riesgo de sangrado bajo–moderado",
      detalle: "Anticoagular según CHA₂DS₂-VASc, con los controles habituales.",
    },
    {
      min: 3,
      max: 9,
      nivel: "GRAVE",
      titulo: "Riesgo de sangrado alto (≥ 3)",
      detalle:
        "Mayor precaución y controles más frecuentes. No contraindica la anticoagulación: corregir los factores modificables (PA, INR lábil, AINE, alcohol).",
    },
  ],
};

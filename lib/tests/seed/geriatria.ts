import type { TestDef } from "../tipos";

// Tests de la valoración geriátrica integral. Alineados con el control del
// adulto mayor del primer nivel de atención (Programa Nacional del Adulto Mayor,
// MSP Uruguay) y las escalas de referencia internacional.

const SI_NO = (valSi: number) => [
  { etiqueta: "No", valor: 0 },
  { etiqueta: "Sí", valor: valSi },
];

// ─────────────────────────── Índice de Barthel ───────────────────────────
export const BARTHEL: TestDef = {
  slug: "barthel",
  nombre: "Índice de Barthel (actividades básicas de la vida diaria)",
  categoria: "GERIATRIA",
  resumen:
    "Grado de independencia en 10 actividades básicas. Rango 0–100 (de 5 en 5).",
  referencia: "Mahoney FI, Barthel DW. Md State Med J 1965;14:61–65.",
  poblacion: "Adultos mayores; rehabilitación; seguimiento funcional.",
  modoCalculo: "SUMA",
  items: [
    {
      clave: "comer",
      enunciado: "Alimentación",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Independiente", valor: 10 },
        { etiqueta: "Necesita ayuda (cortar, untar…)", valor: 5 },
        { etiqueta: "Dependiente", valor: 0 },
      ],
    },
    {
      clave: "banarse",
      enunciado: "Baño / ducha",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Independiente", valor: 5 },
        { etiqueta: "Dependiente", valor: 0 },
      ],
    },
    {
      clave: "aseo",
      enunciado: "Aseo personal (lavarse la cara, peinarse, afeitarse, lavarse los dientes)",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Independiente", valor: 5 },
        { etiqueta: "Dependiente", valor: 0 },
      ],
    },
    {
      clave: "vestirse",
      enunciado: "Vestirse",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Independiente (incluye botones, cremallera, cordones)", valor: 10 },
        { etiqueta: "Necesita ayuda", valor: 5 },
        { etiqueta: "Dependiente", valor: 0 },
      ],
    },
    {
      clave: "heces",
      enunciado: "Control de heces",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Continente", valor: 10 },
        { etiqueta: "Accidente ocasional", valor: 5 },
        { etiqueta: "Incontinente", valor: 0 },
      ],
    },
    {
      clave: "orina",
      enunciado: "Control de orina",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Continente", valor: 10 },
        { etiqueta: "Accidente ocasional", valor: 5 },
        { etiqueta: "Incontinente / sonda sin autonomía", valor: 0 },
      ],
    },
    {
      clave: "retrete",
      enunciado: "Uso del retrete",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Independiente", valor: 10 },
        { etiqueta: "Necesita ayuda", valor: 5 },
        { etiqueta: "Dependiente", valor: 0 },
      ],
    },
    {
      clave: "traslado",
      enunciado: "Traslado sillón ↔ cama",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Independiente", valor: 15 },
        { etiqueta: "Mínima ayuda física o supervisión", valor: 10 },
        { etiqueta: "Gran ayuda (una o dos personas)", valor: 5 },
        { etiqueta: "Dependiente (no se sienta)", valor: 0 },
      ],
    },
    {
      clave: "deambulacion",
      enunciado: "Deambulación",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Independiente 50 m (puede usar bastón)", valor: 15 },
        { etiqueta: "Necesita ayuda o supervisión 50 m", valor: 10 },
        { etiqueta: "Independiente en silla de ruedas", valor: 5 },
        { etiqueta: "Inmóvil", valor: 0 },
      ],
    },
    {
      clave: "escaleras",
      enunciado: "Subir y bajar escaleras",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Independiente", valor: 10 },
        { etiqueta: "Necesita ayuda o supervisión", valor: 5 },
        { etiqueta: "Incapaz", valor: 0 },
      ],
    },
  ],
  rangos: [
    { min: 0, max: 20, nivel: "GRAVE", titulo: "Dependencia total", detalle: "Requiere asistencia para casi todas las actividades básicas." },
    { min: 21, max: 60, nivel: "GRAVE", titulo: "Dependencia severa", detalle: "Necesita ayuda importante en la vida diaria." },
    { min: 61, max: 90, nivel: "MODERADO", titulo: "Dependencia moderada", detalle: "Ayuda en algunas actividades; plan de cuidados y rehabilitación." },
    { min: 91, max: 99, nivel: "LEVE", titulo: "Dependencia leve", detalle: "Casi independiente; vigilar la actividad más deficitaria." },
    { min: 100, max: 100, nivel: "LEVE", titulo: "Independiente", detalle: "Autónomo para las actividades básicas de la vida diaria." },
  ],
};

// ─────────────────────────── Índice de Katz ───────────────────────────
export const KATZ: TestDef = {
  slug: "katz",
  nombre: "Índice de Katz (ABVD)",
  categoria: "GERIATRIA",
  resumen:
    "Independencia en 6 funciones básicas. Se puntúa 1 por función independiente (0–6).",
  referencia: "Katz S, et al. JAMA 1963;185:914–919.",
  poblacion: "Adultos mayores.",
  modoCalculo: "SUMA",
  items: [
    { clave: "banarse", enunciado: "Baño — se lava completamente sin ayuda (o solo ayuda para una zona)", tipo: "UNICA", opciones: [{ etiqueta: "Dependiente", valor: 0 }, { etiqueta: "Independiente", valor: 1 }] },
    { clave: "vestirse", enunciado: "Vestido — toma la ropa y se viste sin ayuda (salvo atarse los cordones)", tipo: "UNICA", opciones: [{ etiqueta: "Dependiente", valor: 0 }, { etiqueta: "Independiente", valor: 1 }] },
    { clave: "retrete", enunciado: "Uso del retrete — va, se limpia y se acomoda la ropa sin ayuda", tipo: "UNICA", opciones: [{ etiqueta: "Dependiente", valor: 0 }, { etiqueta: "Independiente", valor: 1 }] },
    { clave: "movilidad", enunciado: "Movilidad / transferencia — entra y sale de la cama y de la silla sin ayuda", tipo: "UNICA", opciones: [{ etiqueta: "Dependiente", valor: 0 }, { etiqueta: "Independiente", valor: 1 }] },
    { clave: "continencia", enunciado: "Continencia — control completo de esfínteres", tipo: "UNICA", opciones: [{ etiqueta: "Incontinente (total o parcial)", valor: 0 }, { etiqueta: "Continente", valor: 1 }] },
    { clave: "alimentacion", enunciado: "Alimentación — lleva la comida del plato a la boca sin ayuda", tipo: "UNICA", opciones: [{ etiqueta: "Dependiente", valor: 0 }, { etiqueta: "Independiente", valor: 1 }] },
  ],
  rangos: [
    { min: 0, max: 2, nivel: "GRAVE", titulo: "Dependencia importante", detalle: "Equivale a los grados F–G de la clasificación original de Katz." },
    { min: 3, max: 4, nivel: "MODERADO", titulo: "Dependencia moderada", detalle: "Necesita ayuda en varias funciones básicas." },
    { min: 5, max: 6, nivel: "LEVE", titulo: "Independiente o dependencia leve", detalle: "6 = independiente en las 6 funciones (grado A)." },
  ],
};

// ─────────────────────────── Lawton y Brody ───────────────────────────
export const LAWTON: TestDef = {
  slug: "lawton-brody",
  nombre: "Escala de Lawton y Brody (AIVD)",
  categoria: "GERIATRIA",
  resumen:
    "Independencia en 8 actividades instrumentales. 1 punto por actividad conservada (0–8).",
  referencia: "Lawton MP, Brody EM. Gerontologist 1969;9(3):179–186.",
  poblacion:
    "Adultos mayores que viven en comunidad. (En la versión original, en varones a veces se omiten cocina, tareas del hogar y lavado de ropa.)",
  modoCalculo: "SUMA",
  items: [
    { clave: "telefono", enunciado: "Uso del teléfono (busca números, marca, atiende)", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "compras", enunciado: "Hacer las compras de forma autónoma", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "comida", enunciado: "Preparación de la comida (planifica, cocina y sirve)", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "casa", enunciado: "Cuidado de la casa (tareas domésticas, con ayuda puntual)", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "ropa", enunciado: "Lavado de la ropa", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "transporte", enunciado: "Uso de medios de transporte (conduce o usa transporte público/taxi solo)", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "medicacion", enunciado: "Responsabilidad sobre la medicación (dosis y horarios correctos sin supervisión)", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "dinero", enunciado: "Manejo de asuntos económicos (paga cuentas, maneja dinero, va al banco)", tipo: "UNICA", opciones: SI_NO(1) },
  ],
  rangos: [
    { min: 0, max: 1, nivel: "GRAVE", titulo: "Dependencia total", detalle: "" },
    { min: 2, max: 3, nivel: "MODERADO", titulo: "Dependencia severa", detalle: "" },
    { min: 4, max: 5, nivel: "MODERADO", titulo: "Dependencia moderada", detalle: "" },
    { min: 6, max: 7, nivel: "LEVE", titulo: "Dependencia leve", detalle: "" },
    { min: 8, max: 8, nivel: "LEVE", titulo: "Autónomo para las AIVD", detalle: "" },
  ],
};

// ─────────────────────────── Pfeiffer (SPMSQ) ───────────────────────────
export const PFEIFFER: TestDef = {
  slug: "pfeiffer",
  nombre: "Cuestionario de Pfeiffer (SPMSQ)",
  categoria: "GERIATRIA",
  resumen:
    "Tamizaje de deterioro cognitivo. Se cuentan los ERRORES (0–10).",
  referencia: "Pfeiffer E. J Am Geriatr Soc 1975;23(10):433–441.",
  poblacion:
    "Adultos mayores. Ajuste: +1 error permitido si escolaridad baja; −1 si estudios superiores.",
  modoCalculo: "SUMA",
  items: [
    { clave: "p1", enunciado: "¿Qué fecha es hoy? (día, mes y año)", tipo: "UNICA", opciones: [{ etiqueta: "Correcto", valor: 0 }, { etiqueta: "Error", valor: 1 }] },
    { clave: "p2", enunciado: "¿Qué día de la semana es hoy?", tipo: "UNICA", opciones: [{ etiqueta: "Correcto", valor: 0 }, { etiqueta: "Error", valor: 1 }] },
    { clave: "p3", enunciado: "¿Cómo se llama este lugar / dónde estamos?", tipo: "UNICA", opciones: [{ etiqueta: "Correcto", valor: 0 }, { etiqueta: "Error", valor: 1 }] },
    { clave: "p4", enunciado: "¿Cuál es su número de teléfono? (o su dirección, si no tiene)", tipo: "UNICA", opciones: [{ etiqueta: "Correcto", valor: 0 }, { etiqueta: "Error", valor: 1 }] },
    { clave: "p5", enunciado: "¿Qué edad tiene?", tipo: "UNICA", opciones: [{ etiqueta: "Correcto", valor: 0 }, { etiqueta: "Error", valor: 1 }] },
    { clave: "p6", enunciado: "¿Cuál es su fecha de nacimiento?", tipo: "UNICA", opciones: [{ etiqueta: "Correcto", valor: 0 }, { etiqueta: "Error", valor: 1 }] },
    { clave: "p7", enunciado: "¿Quién es el presidente actual del país?", tipo: "UNICA", opciones: [{ etiqueta: "Correcto", valor: 0 }, { etiqueta: "Error", valor: 1 }] },
    { clave: "p8", enunciado: "¿Quién fue el presidente anterior?", tipo: "UNICA", opciones: [{ etiqueta: "Correcto", valor: 0 }, { etiqueta: "Error", valor: 1 }] },
    { clave: "p9", enunciado: "Dígame el primer apellido de su madre", tipo: "UNICA", opciones: [{ etiqueta: "Correcto", valor: 0 }, { etiqueta: "Error", valor: 1 }] },
    { clave: "p10", enunciado: "Reste de 3 en 3 desde 20 (20, 17, 14, 11, 8...)", tipo: "UNICA", opciones: [{ etiqueta: "Correcto (toda la serie)", valor: 0 }, { etiqueta: "Error", valor: 1 }] },
  ],
  rangos: [
    { min: 0, max: 2, nivel: "LEVE", titulo: "Función cognitiva normal", detalle: "" },
    { min: 3, max: 4, nivel: "MODERADO", titulo: "Deterioro cognitivo leve", detalle: "Confirmar con evaluación cognitiva más amplia (p. ej. MMSE, MoCA) y descartar causas reversibles." },
    { min: 5, max: 7, nivel: "MODERADO", titulo: "Deterioro cognitivo moderado", detalle: "Estudio de deterioro cognitivo; valorar impacto funcional y red de apoyo." },
    { min: 8, max: 10, nivel: "GRAVE", titulo: "Deterioro cognitivo severo", detalle: "" },
  ],
};

// ─────────────────────────── Yesavage GDS-15 ───────────────────────────
export const YESAVAGE: TestDef = {
  slug: "yesavage-gds15",
  nombre: "Escala de depresión geriátrica de Yesavage (GDS-15)",
  categoria: "GERIATRIA",
  resumen:
    "Tamizaje de depresión en el adulto mayor. 15 preguntas de sí/no (0–15).",
  referencia:
    "Sheikh JI, Yesavage JA. Clin Gerontol 1986. Versión abreviada de 15 ítems.",
  poblacion:
    "Adultos mayores sin deterioro cognitivo importante. Referir la última semana.",
  modoCalculo: "SUMA",
  items: [
    { clave: "q1", enunciado: "¿Está básicamente satisfecho con su vida?", tipo: "UNICA", opciones: [{ etiqueta: "Sí", valor: 0 }, { etiqueta: "No", valor: 1 }] },
    { clave: "q2", enunciado: "¿Ha renunciado a muchas de sus actividades e intereses?", tipo: "UNICA", opciones: [{ etiqueta: "Sí", valor: 1 }, { etiqueta: "No", valor: 0 }] },
    { clave: "q3", enunciado: "¿Siente que su vida está vacía?", tipo: "UNICA", opciones: [{ etiqueta: "Sí", valor: 1 }, { etiqueta: "No", valor: 0 }] },
    { clave: "q4", enunciado: "¿Se aburre a menudo?", tipo: "UNICA", opciones: [{ etiqueta: "Sí", valor: 1 }, { etiqueta: "No", valor: 0 }] },
    { clave: "q5", enunciado: "¿Está de buen ánimo la mayor parte del tiempo?", tipo: "UNICA", opciones: [{ etiqueta: "Sí", valor: 0 }, { etiqueta: "No", valor: 1 }] },
    { clave: "q6", enunciado: "¿Teme que le vaya a pasar algo malo?", tipo: "UNICA", opciones: [{ etiqueta: "Sí", valor: 1 }, { etiqueta: "No", valor: 0 }] },
    { clave: "q7", enunciado: "¿Se siente feliz la mayor parte del tiempo?", tipo: "UNICA", opciones: [{ etiqueta: "Sí", valor: 0 }, { etiqueta: "No", valor: 1 }] },
    { clave: "q8", enunciado: "¿Se siente a menudo desamparado o abandonado?", tipo: "UNICA", opciones: [{ etiqueta: "Sí", valor: 1 }, { etiqueta: "No", valor: 0 }] },
    { clave: "q9", enunciado: "¿Prefiere quedarse en casa antes que salir y hacer cosas nuevas?", tipo: "UNICA", opciones: [{ etiqueta: "Sí", valor: 1 }, { etiqueta: "No", valor: 0 }] },
    { clave: "q10", enunciado: "¿Cree que tiene más problemas de memoria que la mayoría de la gente?", tipo: "UNICA", opciones: [{ etiqueta: "Sí", valor: 1 }, { etiqueta: "No", valor: 0 }] },
    { clave: "q11", enunciado: "¿Piensa que es maravilloso estar vivo?", tipo: "UNICA", opciones: [{ etiqueta: "Sí", valor: 0 }, { etiqueta: "No", valor: 1 }] },
    { clave: "q12", enunciado: "¿Se siente inútil o despreciable tal como está ahora?", tipo: "UNICA", opciones: [{ etiqueta: "Sí", valor: 1 }, { etiqueta: "No", valor: 0 }] },
    { clave: "q13", enunciado: "¿Se siente lleno de energía?", tipo: "UNICA", opciones: [{ etiqueta: "Sí", valor: 0 }, { etiqueta: "No", valor: 1 }] },
    { clave: "q14", enunciado: "¿Siente que su situación es desesperada?", tipo: "UNICA", opciones: [{ etiqueta: "Sí", valor: 1 }, { etiqueta: "No", valor: 0 }] },
    { clave: "q15", enunciado: "¿Cree que la mayoría de la gente está mejor que usted?", tipo: "UNICA", opciones: [{ etiqueta: "Sí", valor: 1 }, { etiqueta: "No", valor: 0 }] },
  ],
  rangos: [
    { min: 0, max: 4, nivel: "LEVE", titulo: "Sin indicios de depresión", detalle: "" },
    { min: 5, max: 9, nivel: "MODERADO", titulo: "Probable depresión", detalle: "Evaluación clínica de depresión; explorar ideación de muerte / autolesión." },
    { min: 10, max: 15, nivel: "GRAVE", titulo: "Depresión establecida muy probable", detalle: "Evaluación y tratamiento. Descartar riesgo suicida de forma explícita." },
  ],
};

// ─────────────────────────── MNA-SF ───────────────────────────
export const MNA_SF: TestDef = {
  slug: "mna-sf",
  nombre: "Mini Nutritional Assessment — forma corta (MNA-SF)",
  categoria: "GERIATRIA",
  resumen:
    "Tamizaje de desnutrición en el adulto mayor. 6 ítems (0–14).",
  referencia:
    "Rubenstein LZ, et al. J Gerontol A Biol Sci Med Sci 2001;56(6):M366–M372. Nestlé Nutrition Institute.",
  poblacion: "Adultos ≥ 65 años.",
  modoCalculo: "SUMA",
  items: [
    {
      clave: "apetito",
      enunciado: "En los últimos 3 meses, ¿ha comido menos por falta de apetito, problemas digestivos o dificultad para masticar/tragar?",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Anorexia grave", valor: 0 },
        { etiqueta: "Anorexia moderada", valor: 1 },
        { etiqueta: "Sin anorexia", valor: 2 },
      ],
    },
    {
      clave: "peso",
      enunciado: "Pérdida de peso en los últimos 3 meses",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Mayor de 3 kg", valor: 0 },
        { etiqueta: "No lo sabe", valor: 1 },
        { etiqueta: "Entre 1 y 3 kg", valor: 2 },
        { etiqueta: "Sin pérdida de peso", valor: 3 },
      ],
    },
    {
      clave: "movilidad",
      enunciado: "Movilidad",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "De la cama al sillón", valor: 0 },
        { etiqueta: "Autonomía en el interior", valor: 1 },
        { etiqueta: "Sale del domicilio", valor: 2 },
      ],
    },
    {
      clave: "estres",
      enunciado: "¿Enfermedad aguda o situación de estrés psicológico en los últimos 3 meses?",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Sí", valor: 0 },
        { etiqueta: "No", valor: 2 },
      ],
    },
    {
      clave: "neuro",
      enunciado: "Problemas neuropsicológicos",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Demencia o depresión grave", valor: 0 },
        { etiqueta: "Demencia leve", valor: 1 },
        { etiqueta: "Sin problemas psicológicos", valor: 2 },
      ],
    },
    {
      clave: "imc",
      enunciado: "Índice de masa corporal (o circunferencia de pantorrilla si no hay IMC)",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "IMC < 19 (o pantorrilla < 31 cm)", valor: 0 },
        { etiqueta: "IMC 19 a < 21", valor: 1 },
        { etiqueta: "IMC 21 a < 23", valor: 2 },
        { etiqueta: "IMC ≥ 23 (o pantorrilla ≥ 31 cm)", valor: 3 },
      ],
    },
  ],
  rangos: [
    { min: 0, max: 7, nivel: "GRAVE", titulo: "Malnutrición", detalle: "Valoración nutricional completa e intervención." },
    { min: 8, max: 11, nivel: "MODERADO", titulo: "Riesgo de malnutrición", detalle: "Vigilancia del peso, consejo nutricional y reevaluación." },
    { min: 12, max: 14, nivel: "LEVE", titulo: "Estado nutricional normal", detalle: "" },
  ],
};

// ─────────────────────────── Tinetti (POMA) ───────────────────────────
export const TINETTI: TestDef = {
  slug: "tinetti",
  nombre: "Test de Tinetti (marcha y equilibrio · POMA)",
  categoria: "GERIATRIA",
  resumen:
    "Evaluación observacional del equilibrio (16) y la marcha (12). Total 0–28. Menor puntaje = mayor riesgo de caídas.",
  referencia: "Tinetti ME. J Am Geriatr Soc 1986;34(2):119–126.",
  poblacion: "Adultos mayores que deambulan (con o sin ayuda técnica).",
  modoCalculo: "SUMA",
  items: [
    // Equilibrio
    { clave: "eq_sentado", enunciado: "Equilibrio sentado", tipo: "UNICA", opciones: [{ etiqueta: "Se inclina o se desliza en la silla", valor: 0 }, { etiqueta: "Firme y seguro", valor: 1 }] },
    { clave: "eq_levantarse", enunciado: "Levantarse de la silla", tipo: "UNICA", opciones: [{ etiqueta: "Incapaz sin ayuda", valor: 0 }, { etiqueta: "Capaz usando los brazos", valor: 1 }, { etiqueta: "Capaz sin usar los brazos", valor: 2 }] },
    { clave: "eq_intentos", enunciado: "Intentos de levantarse", tipo: "UNICA", opciones: [{ etiqueta: "Incapaz sin ayuda", valor: 0 }, { etiqueta: "Capaz, más de un intento", valor: 1 }, { etiqueta: "Capaz al primer intento", valor: 2 }] },
    { clave: "eq_inmediato", enunciado: "Equilibrio inmediato al levantarse (primeros 5 s)", tipo: "UNICA", opciones: [{ etiqueta: "Inestable", valor: 0 }, { etiqueta: "Estable con apoyo (bastón, andador o se agarra)", valor: 1 }, { etiqueta: "Estable sin apoyo", valor: 2 }] },
    { clave: "eq_bipedestacion", enunciado: "Equilibrio en bipedestación", tipo: "UNICA", opciones: [{ etiqueta: "Inestable", valor: 0 }, { etiqueta: "Estable con base amplia o apoyo", valor: 1 }, { etiqueta: "Base estrecha sin apoyo", valor: 2 }] },
    { clave: "eq_empujon", enunciado: "Empujón sobre el esternón (3 veces, pies juntos)", tipo: "UNICA", opciones: [{ etiqueta: "Empieza a caer", valor: 0 }, { etiqueta: "Se tambalea, se agarra, se sostiene", valor: 1 }, { etiqueta: "Firme", valor: 2 }] },
    { clave: "eq_ojos", enunciado: "Ojos cerrados de pie (pies juntos)", tipo: "UNICA", opciones: [{ etiqueta: "Inestable", valor: 0 }, { etiqueta: "Estable", valor: 1 }] },
    { clave: "eq_giro_pasos", enunciado: "Giro de 360° — pasos", tipo: "UNICA", opciones: [{ etiqueta: "Pasos discontinuos", valor: 0 }, { etiqueta: "Pasos continuos", valor: 1 }] },
    { clave: "eq_giro_estab", enunciado: "Giro de 360° — estabilidad", tipo: "UNICA", opciones: [{ etiqueta: "Inestable (se agarra, se tambalea)", valor: 0 }, { etiqueta: "Estable", valor: 1 }] },
    { clave: "eq_sentarse", enunciado: "Sentarse", tipo: "UNICA", opciones: [{ etiqueta: "Inseguro (calcula mal la distancia, cae en la silla)", valor: 0 }, { etiqueta: "Usa los brazos o movimiento brusco", valor: 1 }, { etiqueta: "Seguro, movimiento suave", valor: 2 }] },
    // Marcha
    { clave: "m_inicio", enunciado: "Inicio de la marcha (tras la orden de caminar)", tipo: "UNICA", opciones: [{ etiqueta: "Duda o vacila; varios intentos", valor: 0 }, { etiqueta: "Sin vacilación", valor: 1 }] },
    { clave: "m_long_izq", enunciado: "Longitud del paso — el pie izquierdo sobrepasa al derecho", tipo: "UNICA", opciones: [{ etiqueta: "No", valor: 0 }, { etiqueta: "Sí", valor: 1 }] },
    { clave: "m_alt_izq", enunciado: "Altura del paso — el pie izquierdo se despega del suelo", tipo: "UNICA", opciones: [{ etiqueta: "No / arrastra", valor: 0 }, { etiqueta: "Sí", valor: 1 }] },
    { clave: "m_long_der", enunciado: "Longitud del paso — el pie derecho sobrepasa al izquierdo", tipo: "UNICA", opciones: [{ etiqueta: "No", valor: 0 }, { etiqueta: "Sí", valor: 1 }] },
    { clave: "m_alt_der", enunciado: "Altura del paso — el pie derecho se despega del suelo", tipo: "UNICA", opciones: [{ etiqueta: "No / arrastra", valor: 0 }, { etiqueta: "Sí", valor: 1 }] },
    { clave: "m_simetria", enunciado: "Simetría del paso", tipo: "UNICA", opciones: [{ etiqueta: "La longitud de ambos pasos es desigual", valor: 0 }, { etiqueta: "Pasos iguales", valor: 1 }] },
    { clave: "m_continuidad", enunciado: "Continuidad de los pasos", tipo: "UNICA", opciones: [{ etiqueta: "Se detiene entre pasos / discontinuo", valor: 0 }, { etiqueta: "Pasos continuos", valor: 1 }] },
    { clave: "m_trayectoria", enunciado: "Trayectoria (recorrido de ~3 m)", tipo: "UNICA", opciones: [{ etiqueta: "Desviación marcada", valor: 0 }, { etiqueta: "Desviación leve o usa ayuda técnica", valor: 1 }, { etiqueta: "Recta sin ayuda", valor: 2 }] },
    { clave: "m_tronco", enunciado: "Tronco", tipo: "UNICA", opciones: [{ etiqueta: "Balanceo marcado o usa ayuda", valor: 0 }, { etiqueta: "Flexiona rodillas/espalda o abre los brazos", valor: 1 }, { etiqueta: "Sin balanceo, sin flexión, sin usar los brazos", valor: 2 }] },
    { clave: "m_postura", enunciado: "Postura al caminar (base de sustentación)", tipo: "UNICA", opciones: [{ etiqueta: "Talones separados", valor: 0 }, { etiqueta: "Los talones casi se tocan al caminar", valor: 1 }] },
  ],
  rangos: [
    { min: 0, max: 18, nivel: "GRAVE", titulo: "Alto riesgo de caídas", detalle: "Intervención multifactorial: fuerza y equilibrio, revisión de fármacos, calzado, entorno, vitamina D, ayuda técnica." },
    { min: 19, max: 23, nivel: "MODERADO", titulo: "Riesgo moderado de caídas", detalle: "Ejercicio de equilibrio y marcha; revisar factores de riesgo modificables." },
    { min: 24, max: 28, nivel: "LEVE", titulo: "Bajo riesgo de caídas", detalle: "Consejo de actividad física y reevaluación periódica." },
  ],
};

// ─────────────────────────── Test de Barber ───────────────────────────
export const BARBER: TestDef = {
  slug: "barber",
  nombre: "Cuestionario de Barber (detección de adulto mayor vulnerable)",
  categoria: "GERIATRIA",
  resumen:
    "Tamizaje postal/telefónico. Una o más respuestas afirmativas identifica a un adulto mayor potencialmente vulnerable.",
  referencia: "Barber JH, et al. J R Coll Gen Pract 1980;30(210):49–51.",
  poblacion: "Adultos mayores en la comunidad (cribado poblacional en el primer nivel).",
  modoCalculo: "SUMA",
  items: [
    { clave: "solo", enunciado: "¿Vive solo/a?", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "sin_apoyo", enunciado: "¿Se encuentra sin nadie a quien acudir si necesita ayuda?", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "comida", enunciado: "¿Hay más de dos días a la semana que no come caliente?", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "ayuda", enunciado: "¿Necesita de alguien que le ayude a menudo?", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "salir", enunciado: "¿Le impide su salud salir a la calle?", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "valerse", enunciado: "¿Tiene con frecuencia problemas de salud que le impiden valerse por sí mismo?", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "vista", enunciado: "¿Tiene dificultades con la vista para sus tareas habituales?", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "oido", enunciado: "¿Le supone dificultad la conversación porque oye mal?", tipo: "UNICA", opciones: SI_NO(1) },
    { clave: "ingreso", enunciado: "¿Ha estado ingresado en el hospital en el último año?", tipo: "UNICA", opciones: SI_NO(1) },
  ],
  rangos: [
    { min: 0, max: 0, nivel: "LEVE", titulo: "No vulnerable", detalle: "Continuar con los controles habituales." },
    { min: 1, max: 9, nivel: "MODERADO", titulo: "Adulto mayor potencialmente vulnerable", detalle: "Al menos una respuesta afirmativa → indicar valoración geriátrica integral (funcional, cognitiva, afectiva, social y nutricional)." },
  ],
};

// ─────────────────────────── Escala de Downton ───────────────────────────
export const DOWNTON: TestDef = {
  slug: "downton",
  nombre: "Índice de Downton (riesgo de caídas)",
  categoria: "GERIATRIA",
  resumen:
    "Riesgo de caídas a partir de caídas previas, fármacos, déficits sensoriales, estado mental y marcha. ≥ 3 = riesgo alto.",
  referencia: "Downton JH. Falls in the Elderly. London: Edward Arnold, 1993.",
  poblacion: "Adultos mayores, hospitalizados o en la comunidad.",
  modoCalculo: "SUMA",
  items: [
    { clave: "caidas", enunciado: "Caídas previas", tipo: "UNICA", opciones: SI_NO(1) },
    {
      clave: "farmacos",
      enunciado: "Medicamentos que toma (marcar todos los que correspondan)",
      tipo: "MULTIPLE",
      opciones: [
        { etiqueta: "Tranquilizantes o sedantes", valor: 1 },
        { etiqueta: "Diuréticos", valor: 1 },
        { etiqueta: "Antihipertensivos (no diuréticos)", valor: 1 },
        { etiqueta: "Antiparkinsonianos", valor: 1 },
        { etiqueta: "Antidepresivos", valor: 1 },
      ],
    },
    {
      clave: "sensorial",
      enunciado: "Déficits sensoriales (marcar todos los que correspondan)",
      tipo: "MULTIPLE",
      opciones: [
        { etiqueta: "Alteraciones visuales", valor: 1 },
        { etiqueta: "Alteraciones auditivas", valor: 1 },
        { etiqueta: "Alteraciones de las extremidades (ictus, neuropatía, amputación)", valor: 1 },
      ],
    },
    { clave: "mental", enunciado: "Estado mental", tipo: "UNICA", opciones: [{ etiqueta: "Orientado", valor: 0 }, { etiqueta: "Confuso / desorientado", valor: 1 }] },
    {
      clave: "marcha",
      enunciado: "Deambulación",
      tipo: "UNICA",
      opciones: [
        { etiqueta: "Normal", valor: 0 },
        { etiqueta: "Segura con ayuda técnica", valor: 1 },
        { etiqueta: "Insegura (con o sin ayuda)", valor: 1 },
        { etiqueta: "Imposible", valor: 0 },
      ],
    },
  ],
  rangos: [
    { min: 0, max: 2, nivel: "LEVE", titulo: "Riesgo bajo de caídas", detalle: "Medidas generales de prevención." },
    { min: 3, max: 11, nivel: "GRAVE", titulo: "Riesgo alto de caídas (≥ 3)", detalle: "Plan de prevención de caídas: revisión de fármacos, ejercicio, entorno seguro, calzado, corrección sensorial." },
  ],
};

// Algoritmos y protocolos base. Redactados por el equipo DR.UY a partir de
// fuentes reconocidas (AHA/ERC 2020, Surviving Sepsis, guías MSP Uruguay). Cada
// uno trae un diagrama de flujo en SVG y un texto de apoyo en Markdown.
//
// IMPORTANTE: son una ayuda de consulta rápida. Verificá siempre dosis y
// vigencia contra la fuente citada y las guías locales.

import type { CategoriaAlgoritmo } from "@prisma/client";
import { diagramaFlujo, type Nodo } from "./svg";

export interface AlgoritmoSeed {
  slug: string;
  titulo: string;
  categoria: CategoriaAlgoritmo;
  resumen: string;
  fuente: string;
  contenidoMd: string;
  svg: string;
}

const A: AlgoritmoSeed[] = [];

function alg(a: Omit<AlgoritmoSeed, "svg"> & { flujo: Nodo[] }) {
  const { flujo, ...rest } = a;
  A.push({ ...rest, svg: diagramaFlujo(a.titulo, flujo) });
}

// ─────────────────────── Paro cardiorrespiratorio (adulto) ───────────────────────
alg({
  slug: "paro-cardiaco-adulto",
  titulo: "Paro cardiorrespiratorio del adulto (SVCA)",
  categoria: "REANIMACION",
  resumen:
    "Soporte vital cardiovascular avanzado: RCP de alta calidad, desfibrilación precoz y tratamiento de causas reversibles.",
  fuente: "American Heart Association, Guías de RCP y ACE 2020.",
  contenidoMd: `## Prioridades
- **RCP de alta calidad**: 100–120 compresiones/min, profundidad 5–6 cm, permitir reexpansión completa, minimizar interrupciones (< 10 s), relación 30:2 hasta vía aérea avanzada; luego compresiones continuas + 1 ventilación cada 6 s.
- **Desfibrilación precoz** en ritmos desfibrilables (FV / TV sin pulso).
- Cambiar el reanimador que comprime **cada 2 minutos**.

## Ritmo desfibrilable (FV / TV sin pulso)
1. Descarga (bifásico según fabricante, habitualmente 120–200 J) → RCP 2 min inmediata.
2. **Adrenalina 1 mg IV/IO** tras la 2.ª descarga y luego **cada 3–5 min**.
3. **Amiodarona 300 mg IV/IO** tras la 3.ª descarga (2.ª dosis 150 mg). Alternativa: lidocaína 1–1,5 mg/kg.
4. Reevaluar ritmo/pulso cada 2 min.

## Ritmo no desfibrilable (asistolia / AESP)
1. RCP 2 min + **adrenalina 1 mg IV/IO lo antes posible**, luego cada 3–5 min.
2. Buscar y tratar la causa.

## Causas reversibles (5 H y 5 T)
Hipoxia · Hipovolemia · Hidrogeniones (acidosis) · Hipo/hiperpotasemia · Hipotermia ·
Neumotórax a **T**ensión · **T**aponamiento cardíaco · **T**oxinas · **T**rombosis pulmonar · **T**rombosis coronaria.

## Cuidados posparo (si RCE)
Objetivo SpO₂ 92–98 %, evitar hipotensión (PAM ≥ 65 mmHg), ECG de 12 derivaciones, control dirigido de temperatura, buscar y tratar la causa.`,
  flujo: [
    { tipo: "inicio", texto: "Paciente inconsciente, sin respiración normal y sin pulso" },
    { tipo: "accion", texto: "Pedir ayuda y desfibrilador. Iniciar RCP 30:2 de alta calidad. Oxígeno. Monitor/DEA" },
    { tipo: "decision", texto: "¿Ritmo desfibrilable? (FV / TV sin pulso)" },
    { tipo: "accion", texto: "SÍ → Descarga + RCP 2 min. Adrenalina 1 mg cada 3–5 min tras 2.ª descarga. Amiodarona 300 mg tras 3.ª descarga" },
    { tipo: "accion", texto: "NO (asistolia / AESP) → RCP 2 min. Adrenalina 1 mg IV/IO ya y cada 3–5 min" },
    { tipo: "accion", texto: "Cada 2 min: reevaluar ritmo y pulso, cambiar el reanimador. Vía aérea avanzada y capnografía" },
    { tipo: "alerta", texto: "Tratar causas reversibles: 5 H y 5 T" },
    { tipo: "fin", texto: "Si RCE: cuidados posparo (SpO₂ 92–98 %, PAM ≥ 65, ECG 12 der., control de temperatura)" },
  ],
});

// ─────────────────────── OVACE ───────────────────────
alg({
  slug: "ovace-adulto",
  titulo: "Obstrucción de la vía aérea por cuerpo extraño (adulto)",
  categoria: "VIA_AEREA",
  resumen: "Manejo de la asfixia por atragantamiento según sea obstrucción leve o grave.",
  fuente: "European Resuscitation Council, Guidelines 2021 (Basic Life Support).",
  contenidoMd: `## Reconocimiento
Preguntar: **"¿Se está atragantando?"**

## Obstrucción leve (tose de forma efectiva, puede hablar)
- Animar a **toser**. No golpear la espalda. Vigilar hasta que se resuelva o empeore.

## Obstrucción grave (tos inefectiva, no puede hablar, estridor, cianosis)
Si está **consciente**:
1. **5 golpes interescapulares** con el talón de la mano.
2. Si no se resuelve, **5 compresiones abdominales** (maniobra de Heimlich).
3. Alternar 5 y 5 hasta resolver o pérdida de conocimiento.

Si está **inconsciente**:
- Tender en el suelo, **activar emergencia** e iniciar **RCP** (las compresiones generan presión que puede expulsar el cuerpo extraño). Revisar la boca antes de cada ventilación y retirar el objeto solo si es visible.

## Después
Tras compresiones abdominales, valoración médica (riesgo de lesión de vísceras). Tos persistente, disfagia o sensación de cuerpo extraño → derivar.`,
  flujo: [
    { tipo: "inicio", texto: "Sospecha de atragantamiento — preguntar: ¿se está atragantando?" },
    { tipo: "decision", texto: "¿La tos es efectiva? (puede hablar / toser con fuerza)" },
    { tipo: "accion", texto: "SÍ (obstrucción leve): animar a toser, vigilar de cerca" },
    { tipo: "accion", texto: "NO (obstrucción grave) + consciente: 5 golpes en la espalda, luego 5 compresiones abdominales; alternar" },
    { tipo: "alerta", texto: "Si queda inconsciente: al suelo, activar emergencia, iniciar RCP. Revisar la boca antes de cada ventilación" },
    { tipo: "fin", texto: "Tras resolverse: valoración médica (más aún si se hicieron compresiones abdominales)" },
  ],
});

// ─────────────────────── Anafilaxia ───────────────────────
alg({
  slug: "anafilaxia",
  titulo: "Anafilaxia",
  categoria: "RESPIRATORIO",
  resumen:
    "Reacción alérgica sistémica grave. La adrenalina intramuscular es el tratamiento de primera línea y no debe retrasarse.",
  fuente: "World Allergy Organization / EAACI Guidelines 2020.",
  contenidoMd: `## Criterios diagnósticos (cualquiera de los dos)
1. Inicio agudo con afectación de piel/mucosas **y** al menos uno: compromiso respiratorio, hipotensión/síncope, síntomas gastrointestinales graves.
2. Inicio agudo de hipotensión, broncoespasmo o compromiso laríngeo tras exposición a un alérgeno **probable** para ese paciente (aunque no haya síntomas cutáneos).

## Tratamiento inmediato
- **Adrenalina IM 1:1000** en cara anterolateral del muslo. Adulto **0,5 mg** (0,5 mL); niño **0,01 mg/kg** (máx 0,3–0,5 mg). **Repetir cada 5–15 min** si no mejora.
- Retirar el desencadenante. Pedir ayuda.
- **Decúbito supino con piernas elevadas** (sentado si predomina la disnea; lateral si vómitos / embarazo). No incorporar bruscamente.
- **Oxígeno** a alto flujo. **Fluidos IV** (cristaloides 500–1000 mL en bolo, repetir).
- Broncoespasmo: **salbutamol** inhalado.
- Coadyuvantes (no sustituyen a la adrenalina): antihistamínicos H1, corticoides.

## Refractaria
Adrenalina IV en infusión (medio monitorizado). Considerar glucagón si toma betabloqueantes.

## Al alta
Observación 6–12 h (riesgo de reacción bifásica), prescripción de **autoinyector de adrenalina**, plan de acción y derivación a alergología.`,
  flujo: [
    { tipo: "inicio", texto: "Reacción alérgica aguda con compromiso respiratorio, circulatorio o de mucosas" },
    { tipo: "alerta", texto: "ADRENALINA IM 0,5 mg (muslo) YA. Repetir cada 5–15 min si no mejora" },
    { tipo: "accion", texto: "Retirar el alérgeno. Pedir ayuda. Decúbito con piernas elevadas" },
    { tipo: "accion", texto: "Oxígeno alto flujo. Vía IV: cristaloides en bolo 500–1000 mL" },
    { tipo: "accion", texto: "Broncoespasmo → salbutamol. Coadyuvantes: antihistamínico H1 + corticoide" },
    { tipo: "decision", texto: "¿Responde?" },
    { tipo: "accion", texto: "NO → adrenalina IV en infusión (monitorizado); glucagón si toma betabloqueante" },
    { tipo: "fin", texto: "Observación 6–12 h. Autoinyector de adrenalina + plan de acción + alergología" },
  ],
});

// ─────────────────────── ACV isquémico / código ictus ───────────────────────
alg({
  slug: "codigo-ictus",
  titulo: "ACV agudo — código ictus",
  categoria: "NEUROLOGIA",
  resumen:
    "Reconocimiento rápido, tiempo de inicio y traslado a centro con TC y tratamiento de reperfusión. El tiempo es cerebro.",
  fuente: "AHA/ASA Guidelines for the Early Management of Acute Ischemic Stroke 2019.",
  contenidoMd: `## Reconocimiento
Escala prehospitalaria de **Cincinnati** (asimetría facial, descenso de un brazo, alteración del lenguaje). Cualquier signo positivo → sospecha alta.

## Datos críticos
- **Hora de inicio** o **última vez visto bien** (define la ventana de trombólisis/trombectomía).
- Glucemia capilar (la hipoglucemia imita el ACV).
- Medicación (anticoagulantes), TA, comorbilidades.

## Manejo inicial
- ABC. Oxígeno solo si SpO₂ < 94 %. Vía IV. No bajar la TA salvo > 220/120 (o > 185/110 si es candidato a trombólisis).
- **No** dar antiagregantes ni anticoagulantes ni sueros glucosados hasta tener imagen.
- Tratar hipoglucemia (< 60 mg/dL) e hiperglucemia marcada.
- **Traslado urgente** a centro con TC y unidad de ACV. Prenotificación.

## En el centro
TC sin contraste (descartar hemorragia) → si isquémico y en ventana: **trombólisis IV** (alteplasa/tenecteplasa) y/o **trombectomía** en oclusión de gran vaso.`,
  flujo: [
    { tipo: "inicio", texto: "Déficit neurológico focal de inicio súbito" },
    { tipo: "accion", texto: "Cincinnati / FAST. Glucemia capilar. Hora de inicio o última vez visto bien" },
    { tipo: "decision", texto: "¿Hipoglucemia (< 60 mg/dL)?" },
    { tipo: "accion", texto: "SÍ → corregir y reevaluar el déficit" },
    { tipo: "accion", texto: "ABC. O₂ solo si SpO₂ < 94 %. Vía IV. No tratar la TA salvo > 220/120. Nada por boca" },
    { tipo: "alerta", texto: "NO antiagregantes / anticoagulantes / suero glucosado antes de la imagen" },
    { tipo: "accion", texto: "Traslado urgente con prenotificación a centro con TC y unidad de ACV" },
    { tipo: "fin", texto: "TC → si isquémico en ventana: trombólisis IV y/o trombectomía" },
  ],
});

// ─────────────────────── SCA ───────────────────────
alg({
  slug: "sindrome-coronario-agudo",
  titulo: "Síndrome coronario agudo",
  categoria: "CARDIOVASCULAR",
  resumen:
    "Dolor torácico de probable origen isquémico: ECG en < 10 min, tratamiento inicial y estrategia de reperfusión según haya o no elevación del ST.",
  fuente: "Sociedad Europea de Cardiología (ESC), Guías de SCACEST 2023 y SCASEST 2020.",
  contenidoMd: `## Evaluación inmediata
- **ECG de 12 derivaciones en < 10 min** y repetir si cambia la clínica. Derivaciones derechas/posteriores si se sospecha.
- Monitor, desfibrilador cerca, vía IV, SpO₂.
- Troponina (seriada). Rx de tórax. No retrasar la reperfusión por el laboratorio.

## Tratamiento inicial ("MONA" con matices)
- **Antiagregación**: AAS 150–300 mg masticable. Segundo antiagregante según estrategia y guía local.
- **Nitroglicerina** SL si dolor y PAS > 90 y sin sospecha de infarto de VD ni uso de inhibidores de la PDE5.
- **Oxígeno solo si SpO₂ < 90 %.**
- **Analgesia**: opioide IV titulado si el dolor persiste.
- Anticoagulación según estrategia.

## Con elevación del ST (SCACEST)
Reperfusión urgente: **angioplastia primaria** si es accesible en ≤ 120 min desde el diagnóstico; si no, **fibrinólisis** (si no hay contraindicación) y traslado a centro con hemodinamia.

## Sin elevación del ST (SCASEST)
Estratificar el riesgo (GRACE, troponina). Estrategia invasiva precoz en alto riesgo. Ingreso monitorizado.

## Complicaciones
Arritmias, fallo de bomba/shock, complicaciones mecánicas. Paro → algoritmo de SVCA.`,
  flujo: [
    { tipo: "inicio", texto: "Dolor torácico / equivalente anginoso" },
    { tipo: "accion", texto: "ECG 12 derivaciones en < 10 min. Monitor. Vía IV. Troponina seriada" },
    { tipo: "accion", texto: "AAS 150–300 mg masticable. NTG SL si dolor y PAS > 90. O₂ solo si SpO₂ < 90 %. Analgesia opioide si persiste" },
    { tipo: "decision", texto: "¿Elevación del ST (o BRI nuevo)?" },
    { tipo: "alerta", texto: "SÍ (SCACEST) → reperfusión urgente: angioplastia primaria ≤ 120 min o fibrinólisis + traslado" },
    { tipo: "accion", texto: "NO (SCASEST) → 2.º antiagregante + anticoagulación; estratificar (GRACE); invasiva precoz si alto riesgo" },
    { tipo: "fin", texto: "Ingreso monitorizado. Vigilar arritmias y fallo de bomba" },
  ],
});

// ─────────────────────── Sepsis ───────────────────────
alg({
  slug: "sepsis-shock-septico",
  titulo: "Sepsis y shock séptico — primera hora",
  categoria: "METABOLICO",
  resumen:
    "Paquete de medidas de la primera hora: lactato, hemocultivos, antibiótico de amplio espectro y reanimación con cristaloides.",
  fuente: "Surviving Sepsis Campaign 2021.",
  contenidoMd: `## Sospecha
Infección + signos de disfunción orgánica. Tamizaje con **qSOFA** (FR ≥ 22, alteración mental, PAS ≤ 100) o criterios de alerta locales. **Shock séptico**: hipotensión que requiere vasopresores para PAM ≥ 65 **y** lactato > 2 mmol/L pese a fluidos.

## Paquete de la primera hora
1. **Medir lactato** (repetir a las 2–4 h si estaba elevado).
2. **Hemocultivos** (2 sets) **antes** del antibiótico, sin retrasarlo más de 45 min.
3. **Antibiótico IV de amplio espectro** precoz, según foco y epidemiología local.
4. **Cristaloides 30 mL/kg IV** si hipotensión o lactato ≥ 4; reevaluar de forma dinámica (no sobrecargar).
5. **Vasopresores** (noradrenalina de elección) si la PAM sigue < 65 mmHg pese a fluidos.

## Además
Identificar y controlar el foco (drenaje, retirada de catéter). Oxígeno/soporte respiratorio según necesidad. Reevaluación frecuente del estado hemodinámico y de la perfusión.`,
  flujo: [
    { tipo: "inicio", texto: "Infección sospechada + disfunción orgánica / qSOFA ≥ 2" },
    { tipo: "accion", texto: "Lactato. Hemocultivos x2 antes del antibiótico (sin retrasarlo > 45 min)" },
    { tipo: "alerta", texto: "Antibiótico IV de amplio espectro en la primera hora" },
    { tipo: "accion", texto: "Cristaloides 30 mL/kg si hipotensión o lactato ≥ 4 mmol/L. Reevaluar de forma dinámica" },
    { tipo: "decision", texto: "¿PAM < 65 mmHg pese a fluidos?" },
    { tipo: "accion", texto: "SÍ → noradrenalina para PAM ≥ 65. Considerar UCI" },
    { tipo: "accion", texto: "Control del foco (drenaje, retirar catéter). Repetir lactato a las 2–4 h" },
    { tipo: "fin", texto: "Reevaluación hemodinámica frecuente. Ajustar antibiótico con cultivos" },
  ],
});

// ─────────────────────── Crisis asmática ───────────────────────
alg({
  slug: "crisis-asmatica",
  titulo: "Crisis asmática del adulto",
  categoria: "RESPIRATORIO",
  resumen:
    "Valoración de gravedad y tratamiento escalonado con broncodilatadores, corticoide sistémico y oxígeno.",
  fuente: "Global Initiative for Asthma (GINA) 2023.",
  contenidoMd: `## Gravedad (rápida)
- **Leve-moderada**: habla con frases, prefiere sentarse, FR aumentada, FC < 120, SpO₂ 90–95 %, PEF > 50 %.
- **Grave**: habla con palabras, agitado, FR > 30, FC > 120, SpO₂ < 90 %, PEF ≤ 50 %.
- **Riesgo vital**: somnolencia, confusión, tórax silencioso, bradicardia, hipotensión, cianosis.

## Tratamiento
- **Oxígeno** para SpO₂ 93–95 %.
- **Salbutamol** 4–10 puff con cámara cada 20 min la primera hora (o nebulizado 2,5–5 mg), luego según respuesta. Añadir **bromuro de ipratropio** en crisis grave.
- **Corticoide sistémico precoz**: prednisona 40–50 mg VO (o hidrocortisona/metilprednisolona IV) — mantener 5–7 días.
- **Sulfato de magnesio 2 g IV** en 20 min en crisis grave sin respuesta.
- Reevaluar con clínica, SpO₂ y PEF.

## Criterios de derivación / ingreso
Falta de respuesta, PEF < 50 % persistente, SpO₂ < 92 %, agotamiento. **Riesgo vital → UCI**, valorar VNI/IOT. Evitar sedantes.

## Al alta
Plan escrito, técnica inhalatoria, corticoide inhalado, control precoz.`,
  flujo: [
    { tipo: "inicio", texto: "Disnea, sibilancias, tos, opresión torácica en paciente asmático" },
    { tipo: "accion", texto: "Valorar gravedad: habla, FR, FC, SpO₂, uso de musculatura accesoria, PEF" },
    { tipo: "decision", texto: "¿Signos de riesgo vital? (tórax silencioso, confusión, bradicardia, cianosis)" },
    { tipo: "alerta", texto: "SÍ → O₂, salbutamol + ipratropio nebulizados, corticoide IV, magnesio 2 g IV, UCI / valorar IOT" },
    { tipo: "accion", texto: "NO → O₂ para SpO₂ 93–95 %. Salbutamol 4–10 puff con cámara cada 20 min x1 h. Corticoide VO precoz" },
    { tipo: "decision", texto: "¿Mejora a la hora? (clínica, SpO₂, PEF > 60–70 %)" },
    { tipo: "fin", texto: "SÍ → observación y alta con corticoide 5–7 días + plan escrito. NO → escalar y derivar / internar" },
  ],
});

// ─────────────────────── Hipoglucemia ───────────────────────
alg({
  slug: "hipoglucemia",
  titulo: "Hipoglucemia en el adulto",
  categoria: "METABOLICO",
  resumen:
    "Corrección según el nivel de conciencia y la vía disponible, seguida de aporte de hidratos de carbono de absorción lenta y búsqueda de la causa.",
  fuente: "American Diabetes Association, Standards of Care 2023.",
  contenidoMd: `## Definición operativa
Glucemia **< 70 mg/dL** con síntomas; **< 54 mg/dL** es hipoglucemia clínicamente significativa. Ante clínica compatible sin glucómetro: **tratar igual**.

## Paciente consciente y capaz de tragar
- **15–20 g de hidratos de carbono de absorción rápida** (150–200 mL de jugo o bebida azucarada, 3–4 sobres de azúcar disueltos, glucosa en gel).
- **Repetir la glucemia a los 15 min**; si sigue < 70, repetir la toma ("regla del 15").
- Al normalizar: **colación con hidratos de absorción lenta** (pan, galletas) si la próxima comida no es inmediata.

## Paciente con alteración de conciencia / no puede tragar
- **Con vía IV**: 15–25 g de glucosa IV (p. ej. 150–250 mL de dextrosa al 10 %, o 25–50 mL al 50 %); reevaluar y repetir.
- **Sin vía IV**: **glucagón** 1 mg IM/SC (0,5 mg si < 25 kg). Al despertar, aporte oral de hidratos.
- Si sospecha de desnutrición/alcoholismo: **tiamina** antes o junto con la glucosa.

## Después
Buscar la causa (dosis/omisión de comida/insuficiencia renal/fármacos). Ajustar el tratamiento hipoglucemiante. Educación. Observación prolongada si fue por sulfonilureas o insulina lenta.`,
  flujo: [
    { tipo: "inicio", texto: "Síntomas adrenérgicos/neuroglucopénicos o glucemia < 70 mg/dL" },
    { tipo: "decision", texto: "¿Consciente y puede tragar con seguridad?" },
    { tipo: "accion", texto: "SÍ → 15–20 g de hidratos rápidos VO. Reglar del 15: reevaluar a los 15 min y repetir si < 70" },
    { tipo: "accion", texto: "NO + vía IV → glucosa IV 15–25 g (dextrosa 10 % 150–250 mL o 50 % 25–50 mL). Reevaluar" },
    { tipo: "accion", texto: "NO + sin vía → glucagón 1 mg IM/SC. Tiamina si desnutrición/alcohol" },
    { tipo: "accion", texto: "Al normalizar: colación con hidratos de absorción lenta" },
    { tipo: "fin", texto: "Buscar la causa. Ajustar tratamiento. Observación prolongada si sulfonilureas o insulina lenta" },
  ],
});

// ─────────────────────── Trauma grave (ABCDE) ───────────────────────
alg({
  slug: "trauma-abcde",
  titulo: "Evaluación inicial del paciente politraumatizado (ABCDE)",
  categoria: "TRAUMA",
  resumen:
    "Revisión primaria sistemática con control de la hemorragia exanguinante, la vía aérea con protección cervical, la ventilación, la circulación, el estado neurológico y la exposición.",
  fuente: "American College of Surgeons, ATLS 10.ª edición.",
  contenidoMd: `## <C> — Hemorragia exanguinante
Compresión directa, **torniquete** en hemorragia de miembro no controlable, empaquetamiento de heridas de unión.

## A — Vía aérea con control cervical
Permeabilidad, cuerpos extraños, **inmovilización cervical** manual/collar. Vía aérea definitiva si GCS ≤ 8, obstrucción o riesgo de compromiso.

## B — Ventilación
SpO₂, FR, auscultación, inspección. Descartar y tratar: **neumotórax a tensión** (descompresión inmediata), neumotórax abierto, hemotórax masivo. Oxígeno alto flujo.

## C — Circulación
Pulsos, relleno capilar, piel, TA. **Dos vías gruesas**. Controlar focos de sangrado (pelvis: faja pélvica; fémur: tracción). Reanimación **con hemoderivados** en shock hemorrágico; cristaloides con moderación. **Ácido tranexámico** < 3 h. Hipotensión permisiva salvo TCE.

## D — Déficit neurológico
GCS, pupilas, glucemia. Signos de hipertensión intracraneal.

## E — Exposición / entorno
Desvestir, **prevenir la hipotermia** (mantas, fluidos tibios), log-roll con control de columna.

## Luego
Revisión secundaria (cabeza a pies), analgesia, imagen dirigida (eco FAST, Rx), traslado a centro útil. Reevaluar el ABCDE ante cualquier deterioro.`,
  flujo: [
    { tipo: "inicio", texto: "Paciente politraumatizado — revisión primaria" },
    { tipo: "alerta", texto: "<C> Control de hemorragia exanguinante: compresión, torniquete, empaquetamiento" },
    { tipo: "accion", texto: "A — Vía aérea permeable + control cervical. Vía aérea definitiva si GCS ≤ 8" },
    { tipo: "accion", texto: "B — O₂ alto flujo. Descartar neumotórax a tensión (descomprimir ya), abierto, hemotórax masivo" },
    { tipo: "accion", texto: "C — 2 vías gruesas. Faja pélvica / tracción de fémur. Hemoderivados en shock. Ácido tranexámico < 3 h" },
    { tipo: "accion", texto: "D — GCS, pupilas, glucemia. E — exposición evitando la hipotermia" },
    { tipo: "fin", texto: "Revisión secundaria, eco FAST/Rx, analgesia, traslado a centro útil. Reevaluar ABCDE si deteriora" },
  ],
});

export const ALGORITMOS_BASE = A;

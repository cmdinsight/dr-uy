# DR.UY — Caja de Herramientas

Aplicación clínica (PWA mobile-first) para médicos generales, de familia y
emergencistas. Reúne en un solo lugar cuatro herramientas que hoy están
dispersas, y las hace **editables por cada profesional**:

1. **Libreta de contactos** — servicios asistenciales + colegas, con llamada directa.
2. **Test clínicos** — cálculo automático e interpretación por punto de corte.
3. **Algoritmos y protocolos** — diagrama con zoom + texto de apoyo.
4. **Recursos académicos** — enlaces de guías, vademécum y formación.

MVP del proyecto que Francisco Prado desarrolló años atrás y nunca llegó a
publicar. Ver `../DR.UY_Caja_de_Herramientas_Informe.pdf` (informe original) y el
plan de implementación.

## Stack

- Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS
- Prisma + PostgreSQL
- Auth propia con JWT en cookie (`jose` + `bcryptjs`)
- Diagramas y gráficos en SVG puro, sin dependencias
- PWA instalable + service worker mínimo (consulta con mala señal)

Mismo patrón de infraestructura que `CMD Tech/CMD Insight/plataforma`.

## Estructura

```
app/(site)/            Landing pública
app/acceder  app/registro  app/verificar-email  app/setup   Auth
app/app/               Área autenticada (shell con bottom-nav)
  page.tsx             Inicio: favoritos + accesos
  contactos/           Módulo 1
  tests/  tests/[slug]  tests/nuevo    Módulo 2 (calculadora + constructor)
  algoritmos/  .../[slug]  .../nuevo   Módulo 3 (visor + alta con imagen)
  recursos/            Módulo 4
  perfil/              Datos, verificación de email, contraseña
  admin/               Solo ADMIN: sembrar contenido base, estadísticas
app/api/**             Route handlers
lib/tests/engine.ts    Motor de cálculo puro (SUMA / REGLA)
lib/tests/seed/        Definiciones de los ~23 test base
lib/algoritmos/seed.ts Los ~9 algoritmos base (+ generador de SVG)
lib/contactos/seed.ts  lib/recursos/seed.ts
lib/data/*             Acceso a datos + merge "contenido base + usuario"
lib/data/seed.ts       Sembrado idempotente por slug
prisma/schema.prisma   Modelo de datos (dos capas: base / usuario)
```

## Dos capas de contenido

- **Base:** curado por el equipo DR.UY, versionado (`ContenidoVersion`), se
  siembra desde `lib/**/seed`. Se puede actualizar sin publicar una nueva versión
  de la app. El usuario lo ve y puede ocultarlo o ajustarlo, nunca romperlo.
- **Usuario:** contactos, test y protocolos propios; privados por cuenta.

## Puesta en marcha (Vercel)

Ver `PUESTA_EN_MARCHA.md`. En resumen:

1. Importar el repo en Vercel.
2. Crear una base **Vercel Postgres** (setea `DATABASE_URL`).
3. Agregar `AUTH_SECRET` (cadena larga aleatoria). Opcional: `RESEND_API_KEY` +
   `EMAIL_FROM` para la verificación de correo.
4. Redeploy → el build corre `prisma db push` y crea las tablas.
5. Entrar a `/setup` y crear el usuario **ADMIN**.
6. En `/app/admin` → **"Sembrar contenido base"**.
7. Registrar un profesional de prueba y recorrer los 4 módulos.

## Local

```bash
npm install
cp .env.example .env.local   # completar DATABASE_URL y AUTH_SECRET
npx prisma db push
npm run dev
```

## Notas

- `next.config.mjs` tiene `typescript.ignoreBuildErrors: true` como red de
  seguridad del primer deploy (se escribió sin Node local). Cuando `npm run build`
  pase limpio, ponelo en `false`.
- **Descargo médico-legal:** se exige aceptarlo en el primer ingreso a `/app`
  (`Usuario.aceptoDescargoEn`). Texto único en `lib/descargo.ts`.
- **El contenido clínico base es un punto de partida.** Debe ser revisado y
  curado por un profesional (Francisco) antes de un uso real: puntos de corte,
  dosis y vigencia de cada protocolo.
- Falta incorporar lo que aporte el enlace de Lovable de Francisco (pendiente).

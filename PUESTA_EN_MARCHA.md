# Puesta en marcha — DR.UY

## 1. Repositorio

Este proyecto es su propio repo git (rama `main`), independiente de Vivam y de
CMD Insight.

```bash
git init
git add -A
git commit -m "MVP inicial DR.UY — Caja de Herramientas"
```

Crear el repositorio remoto (GitHub, cuenta `cmdinsight` o la que corresponda) y:

```bash
git remote add origin https://github.com/<org>/<repo>.git
git push -u origin main
```

## 2. Vercel

1. **Add New Project** → importar el repo.
2. Framework: Next.js (autodetectado). No cambiar el build command
   (`package.json` ya hace `prisma generate` + `prisma db push` + `next build`).
3. **Storage → Create Database → Postgres** y conectarla al proyecto. Esto crea
   `DATABASE_URL` automáticamente.
4. **Settings → Environment Variables:**
   - `AUTH_SECRET` — cadena larga y aleatoria (ej. `openssl rand -base64 48`).
   - `RESEND_API_KEY` y `EMAIL_FROM` — opcionales, para el correo de verificación.
     Sin ellas la app funciona igual (la verificación no bloquea el uso).
5. **Redeploy.** El build crea las tablas con `prisma db push`.

## 3. Primer uso

1. Ir a `https://<tu-deploy>/setup` → crear el usuario **administrador**.
   (Queda con el correo ya verificado y el descargo aceptado.)
2. Ir a `/app/admin` → **Sembrar / actualizar contenido base**.
   - Carga ~12 contactos, ~23 test, ~9 algoritmos y ~9 recursos.
   - Es **idempotente**: se puede volver a correr; actualiza y no duplica.
   - Si por tiempo de ejecución cortara antes de terminar, volvé a apretarlo:
     retoma sin duplicar.
3. Ir a `/registro` (o en incógnito) → crear un **profesional de prueba** y
   recorrer los 4 módulos.

## 4. Actualizar el contenido clínico

1. Editar los archivos de `lib/tests/seed/`, `lib/algoritmos/seed.ts`,
   `lib/contactos/seed.ts`, `lib/recursos/seed.ts`.
2. Subir el número en `lib/contenido.ts` (`CONTENIDO_VERSION`) y ajustar la nota.
3. `git push` → Vercel redeploya.
4. En `/app/admin` → **Sembrar / actualizar contenido base** otra vez.

No hace falta publicar una nueva versión de la app para cambiar el contenido de
referencia: alcanza con re-sembrar.

## 5. Instalar en el celular

Abrir el sitio en Chrome/Safari del teléfono → menú → **Agregar a pantalla de
inicio**. Se abre en pantalla completa y el shell queda cacheado para consulta
con poca señal.

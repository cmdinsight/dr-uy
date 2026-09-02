# Backlog — DR.UY

Fuera del alcance del MVP. No hacer sin que el usuario lo pida.

## Contenido clínico
- **Curaduría de Francisco:** revisar puntos de corte, dosis, población y vigencia
  de los ~23 test y ~9 algoritmos sembrados. Definir qué entra y qué sale.
- Incorporar lo que aporte el **enlace de Lovable** de Francisco (pendiente de que
  lo comparta).
- Más test: NIHSS completo, Child-Pugh, MELD, GRACE, APACHE II, Wells con
  fracciones, Ottawa (reglas), CAM (delirium), MMSE / MoCA.
- Fórmulas no lineales de test (el motor hoy solo hace SUMA y REGLA).
- Más algoritmos: bradi/taquiarritmia con dosis, RSI, vía aérea difícil,
  intoxicaciones frecuentes con antídotos, quemados (Parkland), estatus epiléptico.

## Producto
- Vista offline real (más allá del app-shell y `/api/contenido`): catálogo
  navegable sin conexión.
- Buscador global unificado en el inicio (test + algoritmos + contactos + recursos).
- Import/export de la libreta de contactos (vCard).
- Compartir contenido entre profesionales / por institución.
- Editor de test base y de algoritmos base desde `/app/admin` (hoy el contenido
  base solo se cambia por código + re-seed).
- Historia por paciente: agrupar registros de test por `pacienteRef`.
- App nativa y publicación en tiendas (hoy es PWA instalable).

## Infraestructura
- `npm run build` local + poner `typescript.ignoreBuildErrors: false`.
- Almacenar imágenes en Vercel Blob en vez de `bytea` en Postgres.
- Verificación de email obligatoria configurable.
- Rate limiting en `/api/auth/login` y `/api/registro`.
- Sembrado en background job si el catálogo crece y el request se acerca al límite
  de tiempo de la función.

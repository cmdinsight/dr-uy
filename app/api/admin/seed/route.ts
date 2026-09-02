import { handler, json, requireApi } from "@/lib/api";
import { sembrarContenidoBase } from "@/lib/data/seed";

export const maxDuration = 60;

export const POST = handler(async () => {
  await requireApi("ADMIN");
  const r = await sembrarContenidoBase();
  return json({ ok: true, ...r });
});

import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const img = await prisma.imagen.findUnique({ where: { id: params.id } });
  if (!img) return new Response("No encontrada", { status: 404 });
  return new Response(new Uint8Array(img.datos), {
    headers: {
      "Content-Type": img.mime,
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}

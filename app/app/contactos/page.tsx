import { requireSession } from "@/lib/auth";
import { contactosEfectivos } from "@/lib/data/contactos";
import { ContactosCliente } from "@/components/contactos/ContactosCliente";

export const dynamic = "force-dynamic";

export default async function ContactosPage() {
  const s = await requireSession();
  const contactos = await contactosEfectivos(s.sub);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-navy">Contactos</h1>
      <ContactosCliente contactos={contactos} />
    </div>
  );
}

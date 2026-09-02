import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DR.UY — Caja de Herramientas",
    template: "%s · DR.UY",
  },
  description:
    "Caja de herramientas clínicas para médicos generales, de familia y emergencistas: contactos, test clínicos, algoritmos y recursos, en un solo lugar y editables.",
  applicationName: "DR.UY",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "DR.UY" },
};

export const viewport: Viewport = {
  themeColor: "#14324f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

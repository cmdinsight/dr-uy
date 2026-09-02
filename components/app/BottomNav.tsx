"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/app", label: "Inicio", icon: "M3 11l9-8 9 8M5 10v10h14V10" },
  { href: "/app/contactos", label: "Contactos", icon: "M4 4h16v16H4zM8 8h8M8 12h8M8 16h5" },
  { href: "/app/tests", label: "Test", icon: "M9 3h6v4H9zM6 7h12v14H6zM9 12h6M9 16h6" },
  { href: "/app/algoritmos", label: "Algoritmos", icon: "M12 3v4M12 17v4M5 12H1M23 12h-4M7 7l-3-3M17 17l3 3M7 17l-3 3M17 7l3-3" },
  { href: "/app/recursos", label: "Recursos", icon: "M4 5h16v14H4zM4 9h16M9 5v14" },
];

export function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed bottom-0 inset-x-0 z-20 border-t border-line bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-content grid grid-cols-5">
        {TABS.map((t) => {
          const activo =
            t.href === "/app" ? path === "/app" : path.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`flex flex-col items-center gap-0.5 py-2 text-[11px] font-semibold ${
                activo ? "text-navy" : "text-slatey"
              }`}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={t.icon} />
              </svg>
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

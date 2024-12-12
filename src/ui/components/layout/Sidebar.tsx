import { routes } from "@/config/routes";
import { Film, Globe, Rocket, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };
  return (
    <aside
      className={`layout__sidebar ${isOpen ? "layout__sidebar--open" : ""}`}
    >
      <nav className="p-4">
        <ul className="space-y-2">
        {routes.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors group
                  ${
                    isActive(item.href)
                      ? "border-1 border-[var(--rebel-yellow)] bg-[var(--rebel-yellow-overlay)]"
                      : "hover:bg-[var(--rebel-yellow-overlay)]"
                  }`}
              >
                {item.icon}
                <span className={`layout__sidebar--text group-hover:text-[var(--rebel-yellow)]`}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

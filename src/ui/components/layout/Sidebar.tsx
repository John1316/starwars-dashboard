import { Film, Globe, Rocket, User } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside
      className={`layout__sidebar ${isOpen ? "layout__sidebar--open" : ""}`}
    >
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--hologram-blue)] transition-colors group"
            >
              <User className="layout__sidebar--text text-[var(--lightsaber-blue)]" />
              <span className="layout__sidebar--text group-hover:text-[var(--lightsaber-blue)]">
                Characters
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/starships"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--hologram-blue)] transition-colors group"
            >
              <Rocket className="layout__sidebar--text text-[var(--lightsaber-blue)]" />
              <span className="layout__sidebar--text group-hover:text-[var(--lightsaber-blue)]">
                Starships
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/planets"
              className="flex items-center gap-3 p-3 rounded-lg  hover:bg-[var(--hologram-blue)] transition-colors group"
            >
              <Globe className="layout__sidebar--text text-[var(--lightsaber-blue)]" />
              <span className="layout__sidebar--text group-hover:text-[var(--lightsaber-blue)]">
                Planets
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/films"
              className="flex items-center gap-3 p-3 rounded-lg  hover:bg-[var(--hologram-blue)] transition-colors group"
            >
              <Film className="layout__sidebar--text text-[var(--lightsaber-blue)]" />
              <span className="layout__sidebar--text group-hover:text-[var(--lightsaber-blue)]">
                Films
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

import { Film, Globe, Rocket, User } from "lucide-react";

const routes = [
  {
    href: "/",
    icon: (
      <User className="layoutsidebar--text text-[var(--lightsaber-blue)]" />
    ),
    label: "Characters",
  },
  {
    href: "/starships",
    icon: (
      <Rocket className="layoutsidebar--text text-[var(--lightsaber-blue)]" />
    ),
    label: "Starships",
  },
  {
    href: "/planets",
    icon: (
      <Globe className="layoutsidebar--text text-[var(--lightsaber-blue)]" />
    ),
    label: "Planets",
  },
  {
    href: "/films",
    icon: (
      <Film className="layoutsidebar--text text-[var(--lightsaber-blue)]" />
    ),
    label: "Films",
  },
];
export { routes };
